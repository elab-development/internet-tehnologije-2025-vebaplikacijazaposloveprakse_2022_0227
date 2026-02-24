import { db } from "@/src/lib/db";
import { ApplicationStatus, JobStatus, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = req.headers.get("x-user-id");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if (userRole !== Role.STUDENT) return NextResponse.json({ message: "Samo korisnici mogu aplicirati na oglase" }, { status: 403 });
        const { id } = await params;
        const adId = parseInt(id);
        const studentId = parseInt(userId);
        if (!id) return NextResponse.json({ message: "Morate izabrati oglas na koji se prijavljujete" }, { status: 400 });
        if (isNaN(adId) || isNaN(studentId)) return NextResponse.json({ message: "Nevazeci ID" }, { status: 400 });
        const ad = await db.ad.findUnique({ where: { id: adId } });
        if (!ad) return NextResponse.json({ message: "Oglas ne postoji" }, { status: 404 });
        if(ad.status!== JobStatus.ACTIVE) return NextResponse.json({ message: "Ne mozete aplicirati na neaktivan oglas" }, { status: 403 });
        if(new Date() > ad.deadline) return NextResponse.json({ message: "Rok za prijavu na ovaj oglas je istekao" }, { status: 403 });
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
    } catch (error : any) {
        if (error.code === 'P2002') return NextResponse.json({ message: "Vec ste aplicirali na ovaj oglas" }, { status: 409 });
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri apliciranju na oglas" }, { status: 500 });
    }
}
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const userId = req.headers.get("x-user-id");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if (userRole !== Role.COMPANY) return NextResponse.json({ message: "Samo kompanije mogu menjati status prijava" }, { status: 403 });
        const { id } = await params;
        if (!id) return NextResponse.json({ message: "Nedostaje ID prijave" }, { status: 400 });
        const applicationId = parseInt(id);
        if (isNaN(applicationId)) return NextResponse.json({ message: "Nevazeci ID prijave" }, { status: 400 });
        const body = await req.json();
        const { status } = body;
        if (!status || !Object.values(ApplicationStatus).includes(status))return NextResponse.json({ message: "Nevalidan status prijave" }, { status: 400 });
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
    } catch (error : any) {
        if (error.code === 'P2025') return NextResponse.json({ message: "Prijava nije pronadjena ili nemate ovlascenje" }, { status: 409 });
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri azuriranju prijave" }, { status: 500 });
    }
}
export async function DELETE(req: NextRequest, {params}: {params:Promise<{id:string}>}) {
    try {
        const userId = req.headers.get("x-user-id");
        if(!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if(userRole !== Role.STUDENT) return NextResponse.json({ message: "Samo korisnici mogu brisati svoje prijave" }, { status: 403 });
        const {id} = await params;
        if(!id) return NextResponse.json({ message: "Nedostaje ID prijave" }, { status: 400 });
        const applicationId = parseInt(id);
        const studentId = parseInt(userId);
        if(isNaN(applicationId) || isNaN(studentId)) return NextResponse.json({ message: "Nevazeci ID prijave ili korisnika" }, { status: 400 });
        const existingApplication = await db.jobApplication.findUnique({
            where: {id:applicationId}
        });
        if(!existingApplication) return NextResponse.json({ message: "Prijava nije pronadjena" }, { status: 404 });
        if(existingApplication.studentId !== studentId) return NextResponse.json({ message: "Nemate ovlascenje da izbrisete ovu prijavu" }, { status: 403 });
        if(existingApplication.status!==ApplicationStatus.PENDING)return NextResponse.json({message:"Vasa prijava je vec obradjena ne mozete je obrisati!"},{status:403});
        const deleteResult = await db.jobApplication.deleteMany({
            where:{
                id:applicationId,
                studentId:studentId,
                status:ApplicationStatus.PENDING
            }
        });
        if(deleteResult.count===0)return NextResponse.json({message:"Prijava nije pronadjena ili ne mozete da je obrisete!"},{status:404});
        
        return NextResponse.json({
            message: "Prijava je uspesno izbrisana!"
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri brisanju prijave" }, { status: 500 });
    }
}