import { db } from "@/src/lib/db";
import { AdminStats } from "@/src/types/adminStats";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Dohvati admin statistiku
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Statistika uspesno dohvacena
 *       403:
 *         description: Nemate pristup
 *       500:
 *         description: Greska na serveru
 */

export async function GET(req: NextRequest) {
    try{
        const userRole = req.headers.get("x-user-role");
        if(userRole !== Role.ADMIN) return NextResponse.json({ message: "Samo admin moze videti statistiku" }, { status: 403 });
    const [
      totalUsers,
      totalCompanies,
      totalStudents,
      bannedUsers,
      pendingCompanies,
      totalAds,
      activeAds,
      expiredAds,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    ] = await Promise.all([
      db.user.count(),
      db.company.count(),
      db.student.count(),
      db.user.count({ where: { isBanned: true } }),
      db.company.count({ where: { isApproved: false } }),
      db.ad.count(),
      db.ad.count({ where: { status: "ACTIVE" } }),
      db.ad.count({ where: { status: "EXPIRED" } }),
      db.jobApplication.count(),
      db.jobApplication.count({ where: { status: "PENDING" } }),
      db.jobApplication.count({ where: { status: "ACCEPTED" } }),
      db.jobApplication.count({ where: { status: "REJECTED" } }),
    ]);

    const stats: AdminStats = {
      totalUsers,
      totalCompanies,
      totalStudents,
      bannedUsers,
      pendingCompanies,
      totalAds,
      activeAds,
      expiredAds,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications,
    };
        return NextResponse.json(stats);
    }catch(error){
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri dobavljanju statistike" }, { status: 500 });
    }
}