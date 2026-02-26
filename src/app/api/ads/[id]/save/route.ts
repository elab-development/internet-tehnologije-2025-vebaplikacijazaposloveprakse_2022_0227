import { db } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/ads/{id}/save:
 *   post:
 *     summary: Sacuvaj ili ukloni oglas iz sacuvanih
 *     tags: [Oglasi]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oglas sacuvan ili uklonjen
 *       401:
 *         description: Niste ulogovani
 *       403:
 *         description: Nemate pristup
 *       500:
 *         description: Greska na serveru
 */

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: adIdStr } = await params;
        const id = parseInt(adIdStr);
        if (isNaN(id)) return NextResponse.json({ message: "Nevalidan ID oglasa" }, { status: 400 });
        const user = request.headers.get("x-user-id");
        const userId = parseInt(user || "");
        if (isNaN(userId)) return NextResponse.json({ message: "Morate biti ulogovani!" }, { status: 401 });
        const userRole = request.headers.get("x-user-role");
        if (userRole !== Role.STUDENT) return NextResponse.json({ message: "Samo studenti mogu sacuvati oglase!" }, { status: 403 });
        const existingSave = await db.savedAd.findUnique({
            where: {
                studentId_adId: {
                adId: id,
                studentId: userId,
                }
            }
        });
        if (existingSave) {
            await db.savedAd.delete({
                where: {
                    studentId_adId: {
                        adId: id,
                        studentId: userId,
                    }
                }
            });
            return NextResponse.json({ message: "Oglas je uklonjen iz sacuvanih!" }, { status: 200 });
        }
        await db.savedAd.create({
            data: {
                adId: id,
                studentId: userId,
            }
        });
        return NextResponse.json({ message: "Oglas je sacuvan!" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri sacuvanju oglasa" }, { status: 500 });
    }
}