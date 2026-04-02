import { NextRequest, NextResponse } from "next/server";

const DOMAIN_MAP: Record<string, string> = {
  "mewstro.app": "/mewstro",
  "www.mewstro.app": "/mewstro",
  "getsmashd.app": "/smashd",
  "www.getsmashd.app": "/smashd",
  "playsmashd.com": "/smashd",
  "www.playsmashd.com": "/smashd",
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";
  const prefix = DOMAIN_MAP[hostname];

  if (!prefix) return NextResponse.next();

  const path = request.nextUrl.pathname;

  // Already prefixed — skip
  if (path.startsWith(prefix)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `${prefix}${path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|mewstro/|smashd/).*)"],
};
