import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const existingToken = cookieStore.get('token')?.value;

        if (!existingToken) {
            return NextResponse.json(
                { message: "Niste ulogovani" },
                { status: 401 }
            );
        }
        const response = NextResponse.json(
            { message: "Uspesno ste se odjavili!" },
            { status: 200 }
        );
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Greska pri odjavi" }, { status: 500 });
    }
}