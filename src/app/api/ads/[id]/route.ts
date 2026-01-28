import { db } from "@/src/lib/db";
import { UpdateAdSchema } from "@/src/lib/validators/ad";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const adId = parseInt(id);
    if (isNaN(adId)) {
      return NextResponse.json({ message: "Nevalidan ID oglasa" }, { status: 400 });
    }
    const ad = await db.ad.findUnique({
      where: { id: adId },
      include: {
        company: {
          select: {
            companyId: true,
            companyName: true,
            location: true,
          },
        },
        _count: {
          select: { applications: true },
        },
      },
    });
    if (!ad) {
      return NextResponse.json({ message: "Oglas nije pronadjen" }, { status: 404 });
    }
    return NextResponse.json(ad, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Greska pri dobavljanju oglasa" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const body = await req.json();
    if (!body) return NextResponse.json({ message: "Nedostaje telo zahteva" }, { status: 400 });
    const validation = UpdateAdSchema.safeParse(body);
    if (!validation.success) {
      const firstErrorMessage = validation.error.issues[0]?.message || "Validacija nije uspela";
      return NextResponse.json({
        message: firstErrorMessage,
        errors: validation.error.issues
      }, { status: 400 });
    }
    const user = req.headers.get("x-user-id");
    if (!user) return NextResponse.json({ message: "Niste autorizovani (samo kompanije mogu da azuriraju oglase)" }, { status: 401 });
    const { id } = await params;
    const adId = parseInt(id);
    if (isNaN(adId)) {
      return NextResponse.json({ message: "Nevalidan ID oglasa" }, { status: 400 });
    }
    const ad = await db.ad.findUnique({
      where: { id: adId },
      select: { companyId: true }
    });
    if (!ad) return NextResponse.json({ message: "Oglas nije nadjen" }, { status: 404 });
    if (ad.companyId !== parseInt(user)) {
      return NextResponse.json({ message: "Mozete menjati samo svoje oglase" }, { status: 403 });
    }
    const { title, description, requirements, location, deadline, jobType } = body;
    const updatedAd = await db.ad.update({
      where: { id: adId },
      data: {
        title,
        description,
        requirements,
        location,
        deadline: deadline ? new Date(deadline) : undefined,
        jobType,
      },
    });
    return NextResponse.json({ message: "Oglas uspesno azuriran", ad: updatedAd }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Greska pri azuriranju oglasa" }, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: `Obrisan oglas ID: ${id}` });
}