import { db } from "@/src/lib/db";
import { JobStatus, JobType, Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
        const userRole = req.headers.get("x-user-role");
        if (userRole !== Role.STUDENT) return NextResponse.json({ message: "Samo studenti mogu videti sacuvane oglase" }, { status: 403 });
        const userIdInt = parseInt(userId);
        if (isNaN(userIdInt)) return NextResponse.json({ message: "Nevalidan ID korisnika" }, { status: 400 });
        const jobType = req.nextUrl.searchParams.get("jobType");
        const status = req.nextUrl.searchParams.get("status");
        const search = req.nextUrl.searchParams.get("q") || "";
        let adFilter: any = {};
        if (search) adFilter.OR = [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { location: { contains: search, mode: "insensitive" } },
        ];
        if (jobType) adFilter.jobType = jobType as JobType;
        if (status) adFilter.status = status as JobStatus;
        const where: any = { studentId: userIdInt };
        if(Object.keys(adFilter).length > 0) where.ad = adFilter;
        const savedAds = await db.savedAd.findMany({
            where: where,
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