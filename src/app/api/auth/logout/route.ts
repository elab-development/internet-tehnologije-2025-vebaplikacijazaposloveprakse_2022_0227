import { NextResponse } from "next/server";

export async function POST() {
    try {
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