import { NextResponse } from "next/server";

/**
 * Temporary diagnostic endpoint to verify env vars are reaching the
 * runtime. Reports presence only, NEVER values. Remove before making
 * the dashboard public or as soon as the login issue is fixed.
 */
export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV ?? "unknown",
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasTeacherPassword: Boolean(process.env.TEACHER_DASHBOARD_PASSWORD),
    hasSiteUrl: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
    // Length fingerprints confirm "not empty string" without leaking values
    urlLength: process.env.NEXT_PUBLIC_SUPABASE_URL?.length ?? 0,
    keyLength: process.env.SUPABASE_SERVICE_ROLE_KEY?.length ?? 0,
    pwLength: process.env.TEACHER_DASHBOARD_PASSWORD?.length ?? 0,
    // Vercel deployment marker
    vercelRegion: process.env.VERCEL_REGION ?? "unknown",
    vercelDeploymentId:
      process.env.VERCEL_DEPLOYMENT_ID?.substring(0, 12) ?? "unknown",
  });
}
