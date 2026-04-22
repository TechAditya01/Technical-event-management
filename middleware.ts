import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('session_token')?.value;
  const pathname = request.nextUrl.pathname;

  // Routes that don't need authentication
  const publicRoutes = ['/', '/init', '/user-login', '/admin-login', '/vendor-login', '/user-signup', '/api/init-db', '/api/auth/signup', '/api/auth/login'];

  // Check if current route is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  if (!sessionToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
