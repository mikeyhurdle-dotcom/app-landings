import { NextRequest, NextResponse } from "next/server";

const DOMAIN_MAP: Record<string, string> = {
  "mewstro.com": "/mewstro",
  "www.mewstro.com": "/mewstro",
  "spindlapp.com": "/spindl",
  "www.spindlapp.com": "/spindl",
};

const TEACHER_HOSTS = new Set([
  "studio.mewstro.com",
  "www.studio.mewstro.com",
]);

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";
  const path = request.nextUrl.pathname;

  if (TEACHER_HOSTS.has(hostname)) {
    if (path.startsWith("/teacher")) return NextResponse.next();

    const url = request.nextUrl.clone();
    url.pathname = path === "/" ? "/teacher" : `/teacher${path}`;
    return NextResponse.rewrite(url);
  }

  const prefix = DOMAIN_MAP[hostname];
  if (!prefix) return NextResponse.next();

  if (path.startsWith(prefix)) return NextResponse.next();
  if (path.startsWith("/teacher")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `${prefix}${path}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|mewstro/|spindl/).*)"],
};
