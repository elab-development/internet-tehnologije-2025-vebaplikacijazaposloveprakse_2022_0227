import { cookies } from "next/headers";
import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const existingToken = cookieStore.get('token')?.value;

        if (existingToken) {
            jwt.verify(existingToken, process.env.JWT_SECRET!);
            return NextResponse.json(
                { message: "Vec ste ulogovani" },
                { status: 400 }
            );
        }
        let body;
        try {
            body = await req.json();
        } catch (error) {
            return NextResponse.json({ message: "Pogresan JSON body format" }, { status: 400 });
        }
        const { email, password } = body;
        const user = await db.user.findUnique({
            where: { email }
        });
        if (!user) return NextResponse.json({ message: "Pogresan email ili lozinka" }, { status: 401 });
        if (user.role === "COMPANY") {
            const company = await db.company.findUnique({ where: { companyId: user.id } });
            if (company && !company.isApproved) {
                return NextResponse.json(
                    { message: "Vaš nalog jos uvek nije odobren od strane administratora." },
                    { status: 403 }
                );
            }
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return NextResponse.json({ message: "Pogresan email ili lozinka" }, { status: 401 });

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            role: user.role
        },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );
        const response = NextResponse.json(
            { message: "Uspesan login!", user: { email: user.email, role: user.role } },
            { status: 200 }
        );

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/"
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Greska na serveru" }, { status: 500 });
    }
}