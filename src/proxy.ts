import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/admin', '/kompanija', '/student'];
const authRoutes = ['/login', '/register'];

export function proxy(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    const { pathname } = req.nextUrl;

    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
    const isAuthRoute = authRoutes.includes(pathname);
    if (isProtectedRoute && !token) {
        const redirectUrl = new URL('/login', req.url);
        redirectUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(redirectUrl);
    }
    if (isAuthRoute && token) {
        return NextResponse.redirect(new URL('/student', req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/kompanija/:path*', '/student/:path*', '/login', '/register'],
};