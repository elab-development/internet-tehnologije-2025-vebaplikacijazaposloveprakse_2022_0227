import { db } from "@/src/lib/db";
import { ApplicationStatus, Role } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request,{ params }: { params: { id: string } }) {
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