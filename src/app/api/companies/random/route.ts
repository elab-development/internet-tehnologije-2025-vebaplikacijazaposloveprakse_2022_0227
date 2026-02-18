import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const companies = await db.$queryRaw`SELECT * FROM "Company" WHERE "isApproved" = true ORDER BY RANDOM() LIMIT 4`;
        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Greska pri dobavljanju kompanija" }, { status: 500 });
    }
}