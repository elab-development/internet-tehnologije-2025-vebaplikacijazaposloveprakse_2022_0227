import { db } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/ads/my-ads:
 *   get:
 *     summary: Dohvati oglase ulogovane kompanije
 *     tags: [Oglasi]
 *     responses:
 *       200:
 *         description: Lista oglasa kompanije
 *       401:
 *         description: Niste ulogovani
 *       403:
 *         description: Nemate pristup
 *       500:
 *         description: Greska na serveru
 */

export async function GET(req: NextRequest) {
      try {
        const userId = req.headers.get("x-user-id");
        const userRole = req.headers.get("x-user-role");
        if (!userId) return NextResponse.json({ message: "Morate biti ulogovani da biste videli svoje oglase" }, { status: 401 });
        if(userRole !== Role.COMPANY)return NextResponse.json({ message: "Samo kompanije mogu videti svoje oglase" }, { status: 403 });
        const parsedId = parseInt(userId);
        if (isNaN(parsedId))return NextResponse.json({ message: "Nevalidan ID korisnika" }, { status: 400 });
        
        const adsResponse = await db.ad.findMany({
          where: { companyId: parsedId },
          include: {
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