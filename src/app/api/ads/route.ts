import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const adsResponse = await db.ad.findMany({
      where: { status: "ACTIVE" },
      include: {
        company: {
          select: {
            companyId: true,
            companyName: true,
            location: true,
            isApproved: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(adsResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Greska pri dobavljanju oglasa" }, { status: 500 });
  }
}