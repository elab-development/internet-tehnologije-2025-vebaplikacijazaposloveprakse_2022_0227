// src/app/api/salary/route.ts
import { adzunaService } from "@/src/services/publicAPI/adzunaService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const jobTitle = searchParams.get("jobTitle") || "developer";
        const data = await adzunaService.getAverageSalary(jobTitle);
        return NextResponse.json(data);
    } catch (error) {
            console.error("Salary API error:", error); // dodaj ovo
        return NextResponse.json({ message: "Greska" }, { status: 500 });
    }
}