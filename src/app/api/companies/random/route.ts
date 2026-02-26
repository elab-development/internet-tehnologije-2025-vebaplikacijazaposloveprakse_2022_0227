import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/companies/random:
 *   get:
 *     summary: Dohvati 4 random kompanije
 *     tags: [Kompanije]
 *     responses:
 *       200:
 *         description: Lista random kompanija
 *       500:
 *         description: Greska na serveru
 */

export async function GET() {
    try {
        const companies = await db.$queryRaw`SELECT * FROM "Company" WHERE "isApproved" = true ORDER BY RANDOM() LIMIT 4`;
        return NextResponse.json(companies, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Greska pri dobavljanju kompanija" }, { status: 500 });
    }
}