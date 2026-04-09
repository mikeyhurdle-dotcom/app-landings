import { teacherLogout } from "@/lib/teacher-auth";
import { NextResponse } from "next/server";

/**
 * POST /api/teacher-logout — clears the session cookie and redirects
 * back to the login page. Called from the header sign-out button.
 */
export async function POST() {
  await teacherLogout();
  return NextResponse.redirect(
    new URL(
      "/teacher/login",
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    { status: 303 },
  );
}
