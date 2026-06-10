import { NextRequest, NextResponse } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/practice/supabase/server";

function safeNext(raw: string | null): string {
  if (raw && raw.startsWith("/practice")) return raw;
  return "/practice";
}

/**
 * First sign-in (Google OAuth lands here without passing the sign-up
 * form) goes through onboarding — display name + studio join. Returning
 * students, who already have a display name, go straight on.
 */
async function landing(
  supabase: Awaited<ReturnType<typeof createClient>>,
  next: string,
): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return next;

  const { data } = await supabase
    .from("mewstro_user_profiles")
    .select("display_name")
    .eq("user_id", user.id);

  if (data?.[0]?.display_name) return next;
  return `/practice/onboarding?next=${encodeURIComponent(next)}`;
}

/**
 * Lands both the Google OAuth redirect (`?code=`) and Supabase email
 * confirmation links (`?token_hash=&type=`), then forwards to `next`.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const next = safeNext(searchParams.get("next"));

  const supabase = await createClient();

  const code = searchParams.get("code");
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}${await landing(supabase, next)}`);
  }

  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type,
    });
    if (!error) return NextResponse.redirect(`${origin}${await landing(supabase, next)}`);
  }

  return NextResponse.redirect(
    `${origin}/practice/sign-in?error=auth&next=${encodeURIComponent(next)}`,
  );
}
