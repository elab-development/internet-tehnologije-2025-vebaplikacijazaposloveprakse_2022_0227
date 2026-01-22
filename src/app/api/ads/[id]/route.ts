import { NextResponse } from "next/server";

export async function GET(req: Request,{ params }: { params: Promise<{ id: string }> }) 
{
  const { id } = await params;
  return NextResponse.json({ message: `Oglas ID: ${id}` });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: `Azuriran oglas ID: ${id}` });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return NextResponse.json({ message: `Obrisan oglas ID: ${id}` });
}