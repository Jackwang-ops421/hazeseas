import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intl = createMiddleware({ ...routing, alternateLinks: false });

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const res = intl(req);
  if (!res) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-current-path", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
  res.headers.set("x-current-path", pathname);
  return res;
}

export const config = {
  matcher: [
    "/((?!api|ads|_next/static|_next/image|favicon.ico|.*\\..*).*)",
    "/",
  ],
};