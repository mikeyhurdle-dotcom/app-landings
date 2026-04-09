import { cookies } from "next/headers";

/**
 * Shared-password gate for the teacher dashboard. Deliberately simple —
 * this is demo-level protection so Ellie can click one link and land in
 * her dashboard. Real per-teacher auth (Supabase magic link) comes in the
 * next sprint once the demo validates the shape.
 *
 * The cookie is httpOnly + secure in production + sameSite: lax so it
 * survives a normal link click but isn't exposed to client JS.
 */

const COOKIE_NAME = "mewstro_teacher_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getConfiguredPassword(): string {
  const pw = process.env.TEACHER_DASHBOARD_PASSWORD;
  if (!pw) {
    throw new Error(
      "TEACHER_DASHBOARD_PASSWORD env var not set. Add it in Vercel (and .env.local for dev).",
    );
  }
  return pw;
}

/**
 * Called from the login server action. Returns true on match and sets the
 * session cookie. Returns false on mismatch without setting anything.
 */
export async function verifyPasswordAndLogin(
  submitted: string,
): Promise<boolean> {
  const expected = getConfiguredPassword();
  if (submitted !== expected) return false;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "ok", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
  return true;
}

/**
 * Called from the dashboard layout to check whether the visitor is already
 * logged in. Returns true if the session cookie is present and valid.
 */
export async function isTeacherLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value === "ok";
}

/**
 * Called from the logout action.
 */
export async function teacherLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
