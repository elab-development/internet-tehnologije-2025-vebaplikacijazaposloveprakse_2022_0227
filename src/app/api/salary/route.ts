import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || "developer";
        const APP_ID = process.env.ADZUNA_APP_ID;
        const APP_KEY = process.env.ADZUNA_APP_KEY;
        const url = `https://api.adzuna.com/v1/api/jobs/us/history?app_id=${APP_ID}&app_key=${APP_KEY}&what=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Adzuna API error" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Salary API error:", error);
        return NextResponse.json({ message: "Greska na serveru" }, { status: 500 });
    }
}