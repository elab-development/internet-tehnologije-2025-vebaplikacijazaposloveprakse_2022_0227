import { db } from "@/src/lib/db";
import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Dohvati sve korisnike (admin)
 *     tags: [Admin]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Pretraga po imenu, emailu ili indeksu
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Filter po roli
 *       - in: query
 *         name: isBanned
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isApproved
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Lista korisnika
 *       403:
 *         description: Nemate pristup
 *       500:
 *         description: Greska na serveru
 */

export async function GET(req: NextRequest) {
    try{
        const userRole = req.headers.get("x-user-role");
        if(userRole !== Role.ADMIN) return NextResponse.json({ message: "Samo admin moze videti sve korisnike" }, { status: 403 });
        const searchParams = req.nextUrl.searchParams;
        const query = searchParams.get("q") || "";
        const role = searchParams.get("role");
        const isBanned = searchParams.get("isBanned");
        const isApproved = searchParams.get("isApproved");
        let filter: any = {};
        if (query) {
            filter.OR = [
                { firstName: { contains: query, mode: "insensitive" } },
                { lastName: { contains: query, mode: "insensitive" } },
                { email: { contains: query, mode: "insensitive" } },
                { studentProfile: { studentIndex: { contains: query, mode: "insensitive" } } },
                { companyProfile: { companyName: { contains: query, mode: 'insensitive' } } },
            ];
        }
        if(role)filter.role = role as Role;
        if(isBanned !== null) filter.isBanned = isBanned === "true";
        if(isApproved !== null) filter.companyProfile = { isApproved: isApproved === "true" };
        const users = await db.user.findMany({
            where: filter,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                isBanned: true,
                banReason: true,
                companyProfile: {
                    select: {
                        companyName: true,
                        isApproved: true
                    }
                },
                studentProfile: {
                    select: {
                        studentIndex: true,
                        status: true
                    }
                }
            },
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(users);

    }catch(error){
        return NextResponse.json({ message: error instanceof Error ? error.message : "Greska pri dobavljanju korisnika" }, { status: 500 });
    }
}