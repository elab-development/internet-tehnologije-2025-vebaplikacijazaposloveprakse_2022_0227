import { db } from "@/src/lib/db";
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
  const { id } = await params;
  const adId = parseInt(id);

}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: `Obrisan oglas ID: ${id}` });
}