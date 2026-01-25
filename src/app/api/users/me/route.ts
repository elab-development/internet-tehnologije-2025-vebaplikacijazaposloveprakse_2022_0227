import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/src/lib/db";
import { UpdateUserData } from "@/src/types/user";
import { getUserFromToken } from "@/src/lib/authHelper";
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
    const body: UpdateUserData = await req.json();
    const { firstName, lastName, phone, studentProfile, companyProfile } = body;
    const updatedUser = await db.user.update({
      where: { id: decoded.userId },
      data: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phone: phone || undefined,
        ...(decoded.role === "STUDENT" && studentProfile && {
          studentProfile: {
            update: {
              studentIndex: studentProfile.studentIndex || undefined,
              profileDescription: studentProfile.profileDescription || undefined,
              status: studentProfile.status || undefined
            },
          },
        }),
        ...(decoded.role === "COMPANY" && companyProfile && {
          companyProfile: {
            update: {
              companyName: companyProfile.companyName || undefined,
              taxNumber: companyProfile.taxNumber || undefined,
              regNumber: companyProfile.regNumber || undefined,
              industry: companyProfile.industry || undefined,
              website: companyProfile.website || undefined,
              location: companyProfile.location || undefined,
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