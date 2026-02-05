import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { Role } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const authRoutes = ['/api/auth/login', '/api/auth/register'];
interface JWTPayload {
    userId: number;
    role: 'ADMIN' | 'COMPANY' | 'STUDENT';
    email: string;
}
export async function proxy(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    let payload: JWTPayload | null = null;

    if (token) {
        try {
            const { payload: decoded } = await jwtVerify(token, JWT_SECRET);
            payload = decoded as unknown as JWTPayload;
        } catch (err) {

        }
    }
    const isAuthRoute = authRoutes.includes(pathname);

    if (isAuthRoute && payload) {
        return NextResponse.redirect(new URL('/', req.url));
    }
    const isPublicApi =(pathname.startsWith('/api/ads') && req.method === 'GET') ||isAuthRoute;
    if (!isPublicApi && pathname.startsWith('/api/')) {
        if (!payload) {
            return NextResponse.json({
                message: 'Morate biti ulogovani'
            }, { status: 401 });
        }
    }
    const requestHeaders = new Headers(req.headers);
    if (payload) {
        requestHeaders.set('x-user-id', payload.userId.toString());
        requestHeaders.set('x-user-role', payload.role);
    }
    if (pathname.startsWith('/api/ads') && req.method === 'POST') {
        if (!payload || payload.role !== Role.COMPANY) {
            return NextResponse.json({ message: 'Samo kompanije mogu kreirati oglase' }, { status: 403 });
        }
    }
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        '/login',
        '/register',
        '/api/:path*'
    ],
};