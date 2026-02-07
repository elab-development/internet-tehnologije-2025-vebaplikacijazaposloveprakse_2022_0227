import { db } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";


//-----------BAN USER-----------//
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = req.headers.get("x-user-id");
        if(!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if(userRole !== Role.ADMIN) return NextResponse.json({ message: "Samo admin moze banovati korisnike" }, { status: 403 });
        const { id } = params;
        if (!id) return NextResponse.json({ message: "Nedostaje ID korisnika" }, { status: 400 });
        const userIdToBan = parseInt(id);
        if(isNaN(userIdToBan)) return NextResponse.json({ message: "Nevazeci ID korisnika" }, { status: 400 });
        const banUser = await db.user.update({
            where: { id: userIdToBan },
            data: { banned: true }
        });
        return NextResponse.json({
            message: "Korisnik je uspesno banovan!",
            data: banUser
        }, { status: 200 });
    } catch (error) {
            return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri banovanju korisnika" }, { status: 500 });
    }
}