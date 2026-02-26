import { db } from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Dohvati sve kompanije
 *     tags: [Kompanije]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista kompanija
 *       500:
 *         description: Greska na serveru
 */

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;
        const [companies, total] = await Promise.all([
            db.company.findMany({
                where: { isApproved: true },
                include: {
                    _count: {
                        select: { ads: true },
                    },
                },
                orderBy: { companyName: "asc" },
                skip: skip,    
                take: limit,   
            }),
            db.company.count({ where: { isApproved: true } }),
        ]);
        return NextResponse.json({
            data: companies,
            meta: {
                total: total,
                page: page,
                limit: limit,
                totalPages: Math.ceil(total / limit),
            }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Greska pri dobavljanju kompanija" }, { status: 500 });
    }
}