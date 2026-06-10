import { cookies } from "next/headers";

/**
 * Multi-studio password gate for the teacher dashboard. Each configured
 * password maps to a single studio name; the cookie stores the resolved
 * studio so subsequent requests know which tenant to scope queries to.
 *
 * Configured studios:
 *   TEACHER_DASHBOARD_PASSWORD       → "EM:CAS"             (Ellie's pilot)
 *   TEACHER_DASHBOARD_PASSWORD_DEMO  → "Mewstro Studio"     (sales/marketing)
 *   TEACHER_DASHBOARD_PASSWORD_TEST  → "Mewstro (Test)"     (Mikey's testing)
 *   TEACHER_DASHBOARD_PASSWORD_JOSH  → "Josh Ingram Studio" (Founding Studio pilot)
 *
 * Real per-teacher auth (Supabase magic link) is still the next step;
 * this is the smallest change that unblocks Ellie + a demo + a test
 * studio without leaking each other's data into the same view.
 */

const COOKIE_NAME = "mewstro_teacher_session";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getPasswordToStudioMap(): Record<string, string> {
  const map: Record<string, string> = {};
  const ellie = process.env.TEACHER_DASHBOARD_PASSWORD;
  const demo = process.env.TEACHER_DASHBOARD_PASSWORD_DEMO;
  const test = process.env.TEACHER_DASHBOARD_PASSWORD_TEST;
  const josh = process.env.TEACHER_DASHBOARD_PASSWORD_JOSH;
  if (ellie) map[ellie] = "EM:CAS";
  if (demo) map[demo] = "Mewstro Studio";
  if (test) map[test] = "Mewstro (Test)";
  if (josh) map[josh] = "Josh Ingram Studio";
  if (Object.keys(map).length === 0) {
    throw new Error(
      "No TEACHER_DASHBOARD_PASSWORD* env vars set. Add at least one in Vercel (and .env.local for dev).",
    );
  }
  return map;
}

function getValidStudioNames(): Set<string> {
  return new Set(Object.values(getPasswordToStudioMap()));
}

export async function verifyPasswordAndLogin(
  submitted: string,
): Promise<boolean> {
  const studio = getPasswordToStudioMap()[submitted];
  if (!studio) return false;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, studio, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
  return true;
}

/**
 * Returns the studio name from the active session cookie, or null when
 * not logged in. Validates against the currently-configured password
 * map so a rotated env var doesn't leave stale cookies authenticating
 * into a studio that's no longer wired up.
 */
export async function getActiveStudioName(): Promise<string | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return null;
  return getValidStudioNames().has(value) ? value : null;
}

export async function isTeacherLoggedIn(): Promise<boolean> {
  return (await getActiveStudioName()) !== null;
}

export async function teacherLogout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
