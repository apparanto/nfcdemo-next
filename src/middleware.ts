import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") return;
  const realIp = request.headers.get('X-Real-IP');
  const forwardedFor = request.headers.get('X-Forwarded-For');
  console.log("middleware", realIp, forwardedFor, request.nextUrl.pathname);
  return NextResponse.rewrite(new URL('/', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|/|icon.png).*)',
    '/'
  ],
}