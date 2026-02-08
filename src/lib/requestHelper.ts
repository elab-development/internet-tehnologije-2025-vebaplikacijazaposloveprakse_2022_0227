import { Role } from "@prisma/client";
import { NextRequest } from "next/server";

export function getUserFromRequest(req: Request | NextRequest) {
    const userId = req.headers.get('x-user-id');
    const userRole = req.headers.get('x-user-role');

    if (!userId || !userRole) {
        return null;
    }

    return {
        id: parseInt(userId),
        role: userRole as Role
    };
}