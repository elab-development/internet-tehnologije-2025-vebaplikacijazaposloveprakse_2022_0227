import { db } from "@/src/lib/db";
import { PrismaClient, Role } from "@prisma/client";
import { RegisterSchema } from "@/src/lib/validators/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
export async function POST(req: NextRequest) {
    try {
        let body;
        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
        }
        const validation = RegisterSchema.safeParse(body);
        if (!validation.success) {
            const firstErrorMessage = validation.error.issues[0]?.message || "Validacija nije uspela";
            return NextResponse.json({
                message: firstErrorMessage,
                errors: validation.error.issues
            }, { status: 400 });
        }
        const {
            email, password, firstName, lastName, role, phone, // User podaci
            companyName, taxNumber, regNumber, industry, website, location, // Company podaci
            studentIndex, profileDescription // Student podaci
        } = validation.data;
        const existingUser = await db.user.findUnique({
            where: { email },
            select: { id: true }
        });
        if (existingUser) {
            return NextResponse.json(
                { message: "Korisnik sa ovim email-om vec postoji." },
                { status: 409 }
            );
        }
        if (role === Role.COMPANY) {
            const existingCompany = await db.company.findFirst({
                where: {
                    OR: [
                        { taxNumber: taxNumber },
                        { regNumber: regNumber }
                    ]
                },
                select: { companyId: true }
            });
            if (existingCompany) {
                return NextResponse.json(
                    { message: "Firma sa ovim PIB-om ili Maticnim brojem vec postoji." },
                    { status: 409 }
                );
            }
        }
        if (role === Role.STUDENT) {
            const existingStudent = await db.student.findUnique({
                where: { studentIndex },
                select: { studentId: true }
            });
            if (existingStudent) return NextResponse.json({ message: "Student sa ovim brojem indeksa vec postoji." }, { status: 409 });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await db.$transaction(async (prisma) => {
            const userRole = role === Role.COMPANY ? Role.COMPANY : Role.STUDENT;
            const newUser = await prisma.user.create({
                data: {
                    email,
                    firstName,
                    lastName,
                    phone,
                    password: hashedPassword,
                    role: userRole
                }
            });
            if (userRole === Role.COMPANY) {
                await prisma.company.create({
                    data: {
                        companyId: newUser.id,
                        companyName: companyName!,
                        taxNumber: taxNumber!,
                        regNumber: regNumber!,
                        industry: industry!,
                        website: website!,
                        location: location!,
                        isApproved: false

                    }
                });
            } else if (userRole === Role.STUDENT) {
                await prisma.student.create({
                    data: {
                        studentId: newUser.id,
                        studentIndex: studentIndex!,
                        status: "STUDYING",
                        profileDescription: profileDescription,
                    }
                });
            }
        });
        return NextResponse.json({ message: "Uspesna registracija!" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Greska na serveru" }, { status: 500 });
    }
}