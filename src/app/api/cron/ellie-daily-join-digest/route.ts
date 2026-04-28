import { NextRequest, NextResponse } from "next/server";
import { ServerClient } from "postmark";
import { getServerSupabase } from "@/lib/supabase";
import { ELLIE_STUDIO_NAME } from "@/lib/teacher-queries";

// Required Vercel env vars:
//   CRON_SECRET, POSTMARK_SERVER_TOKEN,
//   NEXT_PUBLIC_SUPABASE_URL (existing), SUPABASE_SERVICE_ROLE_KEY (existing)

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECIPIENT = "ellie@em-cas.com";
const SENDER = "Mewstro <noreply@mewstro.com>";
const DASHBOARD_URL = "https://studio.mewstro.com";
const MESSAGE_STREAM = "outbound"; // Postmark default transactional stream

export async function GET(request: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 },
    );
  }
  if (request.headers.get("authorization") !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getServerSupabase();
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("mewstro_leaderboard_memberships")
    .select("user_id, display_name_override, created_at")
    .eq("studio_name", ELLIE_STUDIO_NAME)
    .gte("created_at", cutoff)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: `Supabase: ${error.message}` },
      { status: 500 },
    );
  }

  const newMembers = data ?? [];
  if (newMembers.length === 0) {
    return NextResponse.json({ skipped: true, reason: "no new members" });
  }

  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "POSTMARK_SERVER_TOKEN not configured" },
      { status: 500 },
    );
  }
  const postmark = new ServerClient(token);

  const count = newMembers.length;
  const noun = count === 1 ? "student" : "students";
  const subject = `${count} new ${noun} joined your studio today`;
  const names = newMembers.map(
    (m) => m.display_name_override?.trim() || "A new student",
  );
  const namesList = names.map((n) => `  - ${n}`).join("\n");
  const namesHtml = names
    .map((n) => `<li style="margin:4px 0;">${escapeHtml(n)}</li>`)
    .join("");
  const greeting =
    count === 1
      ? `${names[0]} just joined your studio on Mewstro.`
      : `${count} new students just joined your studio on Mewstro:`;

  const text = [
    "Hi Ellie,",
    "",
    greeting,
    ...(count > 1 ? ["", namesList] : []),
    "",
    "You can see them in your studio dashboard:",
    DASHBOARD_URL,
    "",
    "Thanks for being the first teacher on Mewstro.",
    "— Mikey",
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;max-width:560px;margin:0 auto;padding:24px;"><p>Hi Ellie,</p><p>${escapeHtml(greeting)}</p>${count > 1 ? `<ul style="padding-left:20px;">${namesHtml}</ul>` : ""}<p>You can see them in your studio dashboard:</p><p><a href="${DASHBOARD_URL}" style="color:#2D8B7E;font-weight:600;">${DASHBOARD_URL}</a></p><p>Thanks for being the first teacher on Mewstro.</p><p>— Mikey</p></body></html>`;

  try {
    const result = await postmark.sendEmail({
      From: SENDER,
      To: RECIPIENT,
      Subject: subject,
      TextBody: text,
      HtmlBody: html,
      MessageStream: MESSAGE_STREAM,
    });
    return NextResponse.json({
      sent: true,
      count,
      names,
      messageId: result.MessageID ?? null,
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: `Postmark: ${err instanceof Error ? err.message : String(err)}`,
      },
      { status: 502 },
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
