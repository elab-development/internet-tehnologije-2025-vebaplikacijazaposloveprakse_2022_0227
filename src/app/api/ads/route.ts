import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Lista oglasa" });
}

export async function POST() {
  return NextResponse.json({ message: "Kreiran novi oglas" });
}