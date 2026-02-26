import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.GNEWS_APP_KEY;
        
        const url = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&apikey=${apiKey}`;

        const response = await fetch(url, {
            next: { revalidate: 3600 },
            headers: { "Accept": "application/json" }
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ message: data.errors || "API Error" }, { status: response.status });
        }

        return NextResponse.json(data.articles);
    } catch (error) {
        return NextResponse.json({ message: "Greska na serveru" }, { status: 500 });
    }
}