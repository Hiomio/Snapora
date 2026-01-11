// src/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Single source of truth for route configuration
const ROUTES = {
  // Routes requiring authentication
  protected: [
    '/collections',
    '/dashboard',
    '/notifications',
    '/feed',
    '/tags',
    '/image-detail',
    '/image',
    '/profile',
    '/search',
    '/settings',
    '/upload-image',
    '/users',
  ],
  
  // Routes that redirect to dashboard when authenticated
  authRedirect: [
    '/login',
    '/register',
  ],
  
  // Public routes (optional, for clarity)
  public: [
    '/',
    '/about',
    '/help',
  ]
};

export default async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Authentication check via NextAuth JWT only. Avoid depending on backend cookie domain/samesite.
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const backendToken = session?.backendToken;
  const isAuthenticated = !!backendToken;

  // Check which route category this path belongs to
  const isProtectedRoute = ROUTES.protected.some(route => path.startsWith(route));
  const isAuthRedirectRoute = ROUTES.authRedirect.some(route => path.startsWith(route));

  // Handle redirects based on auth status and route type
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isAuthenticated && isAuthRedirectRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Define matcher configuration directly
export const config = {
  matcher: [
    '/collections/:path*',
    '/dashboard/:path*',
    '/feed/:path*',
    '/image/:path*',
    '/notifications/:path*',
    '/tags/:path*',
    '/profile/:path*',
    '/search/:path*',
    '/settings/:path*',
    '/upload-image/:path*',
    '/users/:path*',
    '/login',
    '/register'
  ]
};