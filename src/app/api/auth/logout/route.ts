import { NextResponse } from "next/server";

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Odjava korisnika
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Uspesna odjava
 *       500:
 *         description: Greska na serveru
 */

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