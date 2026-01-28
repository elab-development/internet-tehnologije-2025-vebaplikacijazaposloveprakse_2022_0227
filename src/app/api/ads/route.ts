import { db } from "@/src/lib/db";
import { CreateAdSchema } from "@/src/lib/validators/ad";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const adsResponse = await db.ad.findMany({
      where: { status: "ACTIVE" },
      include: {
        company: {
          select: {
            companyId: true,
            companyName: true,
            location: true,
            isApproved: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(adsResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Greska pri dobavljanju oglasa" }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const user = request.headers.get("x-user-id");
    if (!user)return NextResponse.json({ message: "Niste autorizovani (samo kompanije mogu da prave oglase)" }, { status: 401 });
    const body = await request.json();
    if(!body) return NextResponse.json({ message: "Nedostaje telo zahteva" }, { status: 400 });
    const validation = CreateAdSchema.safeParse(body);
    if (!validation.success) {
        const firstErrorMessage = validation.error.issues[0]?.message || "Validacija nije uspela";
        return NextResponse.json({
            message: firstErrorMessage,
            errors: validation.error.issues
        }, { status: 400 });
    }
    const { title, description, requirements, location, deadline, jobType } = body;
    const newAd = await db.ad.create({
      data: {
        title,
        description,
        requirements,
        location,
        deadline: new Date(deadline),
        jobType,
        status: "ACTIVE",
        companyId: parseInt(user),
      },
    });
    return NextResponse.json({ message: "Oglas uspesno kreiran", ad: newAd }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Greska pri kreiranju oglasa" }, { status: 500 });
  }
}