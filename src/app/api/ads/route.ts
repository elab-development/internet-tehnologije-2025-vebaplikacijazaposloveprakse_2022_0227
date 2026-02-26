import { db } from "@/src/lib/db";
import { CreateAdSchema } from "@/src/lib/validators/ad";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/ads:
 *   get:
 *     summary: Dohvati sve aktivne oglase
 *     tags: [Oglasi]
 *     responses:
 *       200:
 *         description: Lista oglasa
 *       500:
 *         description: Greska na serveru
 *   post:
 *     summary: Kreiraj novi oglas
 *     tags: [Oglasi]
 *     responses:
 *       201:
 *         description: Oglas uspesno kreiran
 *       401:
 *         description: Niste ulogovani
 *       403:
 *         description: Nemate pristup
 *       500:
 *         description: Greska na serveru
 */

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
export async function POST(request: NextRequest) {
  try {
    const userID = request.headers.get("x-user-id");
    const userRole = request.headers.get("x-user-role");
    if (!userID) return NextResponse.json({ message: "Morate biti ulogovani da biste izvrsili ovu akciju" }, { status: 401 });
    if (userRole !== Role.COMPANY) {
      return NextResponse.json({ message: "Samo kompanije mogu kreirati oglase" }, { status: 403 });
    }
    const body = await request.json();
    if (!body) return NextResponse.json({ message: "Nedostaje telo zahteva" }, { status: 400 });
    const validation = CreateAdSchema.safeParse(body);
    if (!validation.success) {
      const firstErrorMessage = validation.error.issues[0]?.message || "Validacija nije uspela";
      return NextResponse.json({
        message: firstErrorMessage,
        errors: validation.error.issues
      }, { status: 400 });
    }
    const { title, description, requirements, location, deadline, jobType } = body;
    const newAd = await db.ad.create({
      data: {
        title,
        description,
        requirements,
        location,
        deadline: new Date(deadline),
        jobType,
        status: "ACTIVE",
        companyId: parseInt(userID),
      },
    });
    return NextResponse.json({ message: "Oglas uspesno kreiran", ad: newAd }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Greska pri kreiranju oglasa" }, { status: 500 });
  }
}