import { NextRequest, NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { UpdateUserData } from "@/src/types/user";
import { UpdateUserSchema } from "@/src/lib/validators/user";
import { Role } from "@prisma/client";
import { getUserFromRequest } from "@/src/lib/requestHelper";

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Dohvati profil ulogovanog korisnika
 *     tags: [Korisnici]
 *     responses:
 *       200:
 *         description: Profil korisnika
 *       401:
 *         description: Niste ulogovani
 *       404:
 *         description: Korisnik ne postoji
 *       500:
 *         description: Greska na serveru
 *   put:
 *     summary: Azuriraj profil ulogovanog korisnika
 *     tags: [Korisnici]
 *     responses:
 *       200:
 *         description: Profil uspesno azuriran
 *       401:
 *         description: Niste ulogovani
 *       500:
 *         description: Greska na serveru
 */

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromRequest(req);
    if (!user) {
      return NextResponse.json({ message: "Niste ulogovani" }, { status: 401 });
    }
    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
        phone: true,
        studentProfile: {
          select: {
            studentIndex: true,
            profileDescription: true,
            status: true,
          },
        },
        companyProfile: {
          select: {
            companyName: true,
            taxNumber: true,
            regNumber: true,
            industry: true,
            website: true,
            location: true,
            logoUrl: true,
            description: true,
            isApproved: true,
            rejectReason: true,
          },
        },
      },
    });
    if (!userData) {
      return NextResponse.json({ message: "Korisnik ne postoji" }, { status: 404 });
    }
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Token nije validan" }, { status: 401 });
  }
}
export async function PUT(req: Request) {
  try {
    const user = getUserFromRequest(req);

    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    let body: UpdateUserData;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }
    const validationData = UpdateUserSchema.safeParse(body);
    if (!validationData.success) {
      const firstErrorMessage = validationData.error.issues[0]?.message || "Validacija nije uspela";
      return NextResponse.json({
        message: firstErrorMessage,
        errors: validationData.error.issues
      }, { status: 400 });
    }
    const { firstName, lastName, phone, // User podaci
      studentIndex, profileDescription, status, // polja za studenta
      companyName, taxNumber, regNumber, industry, website, location, logoUrl //polja za firmu
    } = validationData.data;
    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        ...(user.role === Role.STUDENT && {
          studentProfile: {
            update: {
              studentIndex: studentIndex || undefined,
              profileDescription: profileDescription || undefined,
              status: status || undefined
            },
          },
        }),
        ...(user.role === Role.COMPANY && {
          companyProfile: {
            update: {
              companyName: companyName || undefined,
              taxNumber: taxNumber || undefined,
              regNumber: regNumber || undefined,
              industry: industry || undefined,
              website: website || undefined,
              location: location || undefined,
              logoUrl: logoUrl || undefined,
              description: profileDescription || undefined
            },
          },
        }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        role: true,
        studentProfile: true,
        companyProfile: true
      }
    });
    return NextResponse.json({ message: "Profil uspesno azuriran", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Doslo je do greske prilikom azuriranja profila" }, { status: 500 });
  }
}