import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const companiesResponse = await db.company.findMany({
      where: { isApproved: true },
      include: {
        _count: {
          select: { ads: true },
        },
      },
      orderBy: { companyName: "asc" },
    });
    
    return NextResponse.json(companiesResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Greska pri dobavljanju kompanija" }, { status: 500 });
  }
}