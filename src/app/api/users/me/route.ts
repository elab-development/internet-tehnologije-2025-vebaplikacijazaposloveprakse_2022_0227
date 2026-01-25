import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/src/lib/db";
import { UpdateUserData } from "@/src/types/user";
import { getUserFromToken } from "@/src/lib/authHelper";
import { UpdateUserSchema } from "@/src/lib/validators/user";
import { Role } from "@prisma/client";
export async function GET() {
  try {
    const decoded = await getUserFromToken();
    if (!decoded) {
      return NextResponse.json({ message: "Niste ulogovani" }, { status: 401 });
    }
    const userData = await db.user.findUnique({
      where: { id: decoded.userId },
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
    const decoded = await getUserFromToken();

    if (!decoded) {
      return NextResponse.json({ message: "Niste ulogovani" }, { status: 401 });
    }
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
      companyName, taxNumber, regNumber, industry, website, location // polja za firmu
    } = validationData.data;
    const updatedUser = await db.user.update({
      where: { id: decoded.userId },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        ...(decoded.role === Role.STUDENT && {
          studentProfile: {
            update: {
              studentIndex: studentIndex || undefined,
              profileDescription: profileDescription || undefined,
              status: status || undefined
            },
          },
        }),
        ...(decoded.role === Role.COMPANY && {
          companyProfile: {
            update: {
              companyName: companyName || undefined,
              taxNumber: taxNumber || undefined,
              regNumber: regNumber || undefined,
              industry: industry || undefined,
              website: website || undefined,
              location: location || undefined,
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