import { db } from "@/src/lib/db";
import { ApplicationStatus } from "@prisma/client";
import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/ads/{id}/applications:
 *   get:
 *     summary: Dohvati prijave za oglas
 *     tags: [Prijave]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista prijava
 *       500:
 *         description: Greska na serveru
 */

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const adId = parseInt(id);
        const companyId = request.headers.get("x-user-id");
        const companyIdNum = parseInt(companyId!);
        const { searchParams } = new URL(request.url);
        const statusFilter = searchParams.get('status');
        if (isNaN(adId)) return NextResponse.json({ message: "Nevalidan ID oglasa" }, { status: 400 });
        const whereClause: any = {
            adId,
            ad: { companyId: companyIdNum }
        };
        if (statusFilter && statusFilter !== 'ALL') {
            whereClause.status = statusFilter as ApplicationStatus;
        }
        const applications = await db.jobApplication.findMany({
            where: whereClause,
            include: {
                student: {
                    select: {
                        studentId: true,
                        user: {
                            select: {
                                email: true,
                                firstName: true,
                                lastName: true,
                                phone: true,
                            }
                        }
                    }
                }
            },
            orderBy: { appliedAt: "desc" },
        });
        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Greska pri dobavljanju prijava za oglas" }, { status: 500 });
    }
}
