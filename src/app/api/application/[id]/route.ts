import { db } from "@/src/lib/db";
import { ApplicationStatus, Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = req.headers.get("x-user-id");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if (userRole != Role.STUDENT) return NextResponse.json({ message: "Samo korisnici mogu aplicirati na oglase" }, { status: 403 });
        const { id } = await params;
        const adId = parseInt(id);
        const studentId = parseInt(userId);
        if (!id) return NextResponse.json({ message: "Morate izabrati oglas na koji se prijavljujete" }, { status: 400 });
        const existingApplication = await db.jobApplication.findUnique({
            where: {
                studentId_adId: {
                    studentId: studentId,
                    adId: adId,
                }
            }
        });
        if (existingApplication) return NextResponse.json({ message: "Vec ste aplicirali na ovaj oglas" }, { status: 409 });
        const newApplication = await db.jobApplication.create({
            data: {
                adId: adId,
                studentId: studentId,
                status: ApplicationStatus.PENDING,
            }
        });
        return NextResponse.json({
            message: "Uspesno ste aplicirali na oglas!",
            data: newApplication
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri apliciranju na oglas" }, { status: 500 });
    }
}
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = req.headers.get("x-user-id");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if (userRole != Role.COMPANY) return NextResponse.json({ message: "Samo kompanije mogu menjati status prijava" }, { status: 403 });
        const { id } = await params;
        const applicationId = parseInt(id);
        if (!id) return NextResponse.json({ message: "Nedostaje ID prijave" }, { status: 400 });
        const body = await req.json();
        const { status } = body;
        if (!status || !Object.values(ApplicationStatus).includes(status))return NextResponse.json({ message: "Nevalidan status prijave" }, { status: 400 });
        const existingApplication = await db.jobApplication.findUnique({
            where: { id: applicationId },
            include: {
                ad: true,
            },
        });
        if (!existingApplication)return NextResponse.json({ message: "Prijava nije pronadjena" }, { status: 404 });
        const updatedApplication = await db.jobApplication.update({
            where:{
                id: applicationId,
                ad:{
                    companyId: parseInt(userId)
                }
            },
            data:{status:status}
        });
        return NextResponse.json({
            message: "Status prijave je uspesno azuriran!",
            data: updatedApplication
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri azuriranju prijave" }, { status: 500 });
    }
}