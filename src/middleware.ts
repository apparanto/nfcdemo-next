import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") return;
  console.log("middleware", request.nextUrl.pathname);
  const realIp = request.headers.get('X-Real-IP');
  console.log(realIp)
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