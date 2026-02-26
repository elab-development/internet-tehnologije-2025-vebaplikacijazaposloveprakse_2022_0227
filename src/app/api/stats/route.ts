import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [totalUsers, totalCompanies, totalStudents, totalAds, activeAds, totalApplications] = await Promise.all([
      db.user.count(),
      db.company.count(),
      db.student.count(),
      db.ad.count(),
      db.ad.count({ where: { status: "ACTIVE" } }),
      db.jobApplication.count(),
    ]);

    return NextResponse.json({ totalUsers, totalCompanies, totalStudents, totalAds, activeAds, totalApplications });
  } catch (error) {
    return NextResponse.json({ message: "Greska" }, { status: 500 });
  }
}