import { db } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const adId = parseInt(id);
        const companyId = request.headers.get("x-user-id");
        const companyIdNum = parseInt(companyId!);
        if (isNaN(adId)) return NextResponse.json({ message: "Nevalidan ID oglasa" }, { status: 400 });
        const applications = await db.jobApplication.findMany({
            where: { adId, ad: { companyId: companyIdNum } },
            include: {
                student: {
                    select: {
                        studentId: true,
                        user: {
                            select: {
                                email: true,
                                firstName: true,
                                lastName: true,
                                phone: true,
                            }
                        }
                    }
                }
            },
            orderBy: { appliedAt: "desc" },
        });
        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Greska pri dobavljanju prijava za oglas" }, { status: 500 });
    }
}
    