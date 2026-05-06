import { teacherLogout } from "@/lib/teacher-auth";
import { NextResponse } from "next/server";

/**
 * POST /api/teacher-logout — clears the session cookie and redirects
 * back to the login page. Called from the header sign-out button.
 *
 * Builds the redirect target from the incoming request URL so it lands
 * on the same origin the user is on (works for studio.mewstro.com,
 * www.studio.mewstro.com, and localhost in dev — no env var needed).
 */
export async function POST(request: Request) {
  await teacherLogout();
  return NextResponse.redirect(new URL("/teacher/login", request.url), {
    status: 303,
  });
}
