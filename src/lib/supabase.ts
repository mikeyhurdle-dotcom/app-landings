import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client for the teacher dashboard.
 *
 * Uses the service role key to bypass RLS — the dashboard is protected by
 * the teacher password cookie (see `teacher-auth.ts`), so RLS-level auth
 * isn't available. We never expose this client to the browser.
 *
 * Required env vars on Vercel (and in .env.local for dev):
 *   - NEXT_PUBLIC_SUPABASE_URL         e.g. https://nspgvdytqsvnmbitbmey.supabase.co
 *   - SUPABASE_SERVICE_ROLE_KEY        the long service_role secret
 */
export function getServerSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel (or .env.local for dev).",
    );
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
