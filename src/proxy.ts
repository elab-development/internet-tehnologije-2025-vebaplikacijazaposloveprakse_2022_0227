import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const authRoutes = ['/login', '/register'];

export async function proxy(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    let payload: any = null;

    if (token) {
        try {
            const { payload: decoded } = await jwtVerify(token, JWT_SECRET);
            payload = decoded;
        } catch (err) {
            console.error("Proxy JWT Error:", err);
        }
    }

    const isAuthRoute = authRoutes.includes(pathname);
    if (isAuthRoute && payload) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const requestHeaders = new Headers(req.headers);
    if (payload) {
        requestHeaders.set('x-user-id', payload.userId.toString());
        requestHeaders.set('x-user-role', payload.role);
    }
    if (pathname.startsWith('/api/ads') && req.method === 'POST') {
        if (!payload || payload.role !== 'COMPANY') {
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