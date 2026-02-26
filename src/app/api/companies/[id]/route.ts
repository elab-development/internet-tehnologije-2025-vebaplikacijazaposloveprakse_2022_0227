import { db } from "@/src/lib/db";
import { JobStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Dohvati kompaniju po ID-u
 *     tags: [Kompanije]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Kompanija uspesno dohvacena
 *       404:
 *         description: Kompanija nije pronadjena
 *       500:
 *         description: Greska na serveru
 */


export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const companyId = parseInt(id);
        if (isNaN(companyId)) {
            return NextResponse.json({ message: "Nevalidan ID kompanije" }, { status: 400 });
        }
        const company = await db.company.findUnique({
            where: { companyId: companyId },
            include: {
                ads: {
                    where: { status: JobStatus.ACTIVE },
                    orderBy: { createdAt: "desc" },
                    include: {
                        _count: {
                            select: { applications: true },
                        },
                    },
                },
            },
        });
        if (!company) {
            return NextResponse.json({ message: "Kompanija nije pronadjena" }, { status: 404 });
        }
        return NextResponse.json(company, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Greska pri dobavljanju kompanije" }, { status: 500 });
    }       
}