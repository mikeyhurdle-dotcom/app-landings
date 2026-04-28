import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "mewstro_attribution";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_APP_STORE_URL =
  "https://apps.apple.com/app/mewstro/id0000000000";

type AttributionCookie = {
  code: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  first_seen: string;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code: rawCode } = await params;
  const code = rawCode.toUpperCase();
  const { searchParams } = request.nextUrl;

  const appStoreUrl =
    process.env.NEXT_PUBLIC_APP_STORE_URL ?? DEFAULT_APP_STORE_URL;

  const response = NextResponse.redirect(appStoreUrl, 302);

  // First-touch: only set the cookie if one doesn't already exist.
  const existing = request.cookies.get(COOKIE_NAME);
  if (!existing) {
    const payload: AttributionCookie = {
      code,
      utm_source: searchParams.get("utm_source") ?? undefined,
      utm_medium: searchParams.get("utm_medium") ?? undefined,
      utm_campaign: searchParams.get("utm_campaign") ?? undefined,
      utm_content: searchParams.get("utm_content") ?? undefined,
      first_seen: new Date().toISOString(),
    };
    response.cookies.set({
      name: COOKIE_NAME,
      value: JSON.stringify(payload),
      maxAge: COOKIE_MAX_AGE_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: true,
      httpOnly: false,
    });
  }

  return response;
}
