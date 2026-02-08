import { db } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if (userRole !== Role.STUDENT) return NextResponse.json({ message: "Samo studenti mogu videti sacuvane oglase" }, { status: 403 });
        const userIdInt = parseInt(userId);
        if (isNaN(userIdInt)) return NextResponse.json({ message: "Nevalidan ID korisnika" }, { status: 400 });
        const savedAds = await db.savedAd.findMany({
            where: { studentId: userIdInt },
            include: {
                ad: {
                    include: {
                        company: {
                            select: {
                                companyId: true,
                                companyName: true,
                                logoUrl: true,
                            }
                        }
                    }
                }
            },
            orderBy: { savedAt: "desc" }
        });
        return NextResponse.json(savedAds); 
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri dohvatanju sacuvanih oglasa" }, { status: 500 });
    }
}