import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { db } from "@/src/lib/db";
export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Niste ulogovani" }, { status: 401 });
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET nije definisan u .env");
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string; role: string };
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