import { db } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";


//-----------BAN/UNBAN USER AND APPROVED COMPANY-----------//
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = req.headers.get("x-user-id");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if (userRole !== Role.ADMIN) return NextResponse.json({ message: "Samo admin moze banovati korisnike" }, { status: 403 });
        const { id } = await params;
        const targetUserId = parseInt(id);
        if (isNaN(targetUserId)) return NextResponse.json({ message: "Nevalidan ID" }, { status: 400 });
        if (targetUserId === parseInt(userId)) return NextResponse.json({ message: "Ne mozete menjati sami sebe" }, { status: 400 });
        const { banReason, isBanned, isApproved } = await req.json();
        const targetUser = await db.user.findUnique({
            where: { id: targetUserId },
            select: { role: true }
        });
        if (!targetUser) return NextResponse.json({ message: "Korisnik nije pronadjen" }, { status: 404 });
        if(targetUser.role === Role.ADMIN) return NextResponse.json({ message: "Ne mozete menjati admina" }, { status: 403 });
        const updateUser = await db.user.update({
            where: { id: targetUserId },
            data: {
                ...(isApproved !== undefined && { isApproved }),
                ...(isBanned !== undefined && { banned: isBanned }),
                ...(isBanned === true && { banReason: banReason || "Prekrsaj pravila platforme" }),
                ...(isBanned === false && { banReason: null })
            }
        });
        return NextResponse.json({ message: "Korisnik uspesno azuriran", user: updateUser });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri banovanju korisnika" }, { status: 500 });
    }
}