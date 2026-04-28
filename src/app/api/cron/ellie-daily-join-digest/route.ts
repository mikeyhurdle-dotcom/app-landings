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

interface NewMember {
  user_id: string;
  display_name_override: string | null;
  created_at: string;
}

interface CompletionWithStudent {
  student_user_id: string;
  completed_at: string;
  assignment_id: string;
  assignment_title: string;
  student_name: string;
}

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

  // ─── Pull new joiners ──────────────────────────────────────────────────
  const { data: memberData, error: memberErr } = await supabase
    .from("mewstro_leaderboard_memberships")
    .select("user_id, display_name_override, created_at")
    .eq("studio_name", ELLIE_STUDIO_NAME)
    .gte("created_at", cutoff)
    .order("created_at", { ascending: true });

  if (memberErr) {
    return NextResponse.json(
      { error: `Supabase memberships: ${memberErr.message}` },
      { status: 500 },
    );
  }

  const newMembers: NewMember[] = memberData ?? [];

  // ─── Pull assignment completions for Ellie's studio in the last 24h ────
  // mewstro_assignment_completions doesn't link to a studio directly, so
  // resolve the student → studio relation via memberships and the
  // assignment → studio via mewstro_assignments.
  const completions = await pullCompletions(supabase, cutoff);

  // ─── Decide whether to send ────────────────────────────────────────────
  if (newMembers.length === 0 && completions.length === 0) {
    return NextResponse.json({
      skipped: true,
      reason: "no new members and no completions",
    });
  }

  const token = process.env.POSTMARK_SERVER_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "POSTMARK_SERVER_TOKEN not configured" },
      { status: 500 },
    );
  }
  const postmark = new ServerClient(token);

  const subject = buildSubject(newMembers.length, completions.length);
  const text = buildTextBody(newMembers, completions);
  const html = buildHtmlBody(newMembers, completions);

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
      newMembers: newMembers.length,
      completions: completions.length,
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

// ─── Helpers ─────────────────────────────────────────────────────────────

async function pullCompletions(
  supabase: ReturnType<typeof getServerSupabase>,
  cutoffIso: string,
): Promise<CompletionWithStudent[]> {
  // Resolve Ellie's studio id once.
  const { data: studio } = await supabase
    .from("mewstro_studios")
    .select("id")
    .eq("studio_name", ELLIE_STUDIO_NAME)
    .single();
  if (!studio) return [];

  // Pull completions in the window, then narrow to assignments owned by
  // the studio. Two-step JOIN keeps the SQL inside PostgREST's syntax.
  const { data: rawCompletions } = await supabase
    .from("mewstro_assignment_completions")
    .select("assignment_id, student_user_id, completed_at")
    .gte("completed_at", cutoffIso)
    .order("completed_at", { ascending: true });

  const completionList = rawCompletions ?? [];
  if (completionList.length === 0) return [];

  const assignmentIds = Array.from(
    new Set(completionList.map((c) => c.assignment_id)),
  );
  const { data: assignments } = await supabase
    .from("mewstro_assignments")
    .select("id, studio_id, title")
    .in("id", assignmentIds)
    .eq("studio_id", studio.id);

  const titleByAssignment = new Map<string, string>();
  for (const a of assignments ?? []) {
    titleByAssignment.set(a.id, a.title);
  }

  const studentIds = Array.from(
    new Set(completionList.map((c) => c.student_user_id)),
  );
  const { data: memberships } = await supabase
    .from("mewstro_leaderboard_memberships")
    .select("user_id, display_name_override")
    .in("user_id", studentIds)
    .eq("studio_name", ELLIE_STUDIO_NAME);

  const nameByStudent = new Map<string, string>();
  for (const m of memberships ?? []) {
    nameByStudent.set(m.user_id, m.display_name_override?.trim() || "Student");
  }

  return completionList
    .filter((c) => titleByAssignment.has(c.assignment_id))
    .map((c) => ({
      student_user_id: c.student_user_id,
      completed_at: c.completed_at,
      assignment_id: c.assignment_id,
      assignment_title: titleByAssignment.get(c.assignment_id) ?? "Assignment",
      student_name: nameByStudent.get(c.student_user_id) ?? "Student",
    }));
}

function buildSubject(joinCount: number, completionCount: number): string {
  if (joinCount > 0 && completionCount > 0) {
    return `${joinCount} new joiner${joinCount === 1 ? "" : "s"} + ${completionCount} assignment${completionCount === 1 ? "" : "s"} completed`;
  }
  if (joinCount > 0) {
    return `${joinCount} new ${joinCount === 1 ? "student" : "students"} joined your studio today`;
  }
  return `${completionCount} assignment${completionCount === 1 ? "" : "s"} completed today`;
}

function buildTextBody(
  members: NewMember[],
  completions: CompletionWithStudent[],
): string {
  const lines: string[] = ["Hi Ellie,", ""];

  if (members.length > 0) {
    const names = members.map(
      (m) => m.display_name_override?.trim() || "A new student",
    );
    if (members.length === 1) {
      lines.push(`${names[0]} just joined your studio on Mewstro.`);
    } else {
      lines.push(`${members.length} new students joined your studio:`);
      lines.push("");
      for (const n of names) lines.push(`  - ${n}`);
    }
    lines.push("");
  }

  if (completions.length > 0) {
    lines.push(
      completions.length === 1
        ? "And 1 assignment completion in the last 24 hours:"
        : `And ${completions.length} assignment completions in the last 24 hours:`,
    );
    lines.push("");
    for (const c of completions) {
      lines.push(`  - ${c.student_name} → ${c.assignment_title}`);
    }
    lines.push("");
  }

  lines.push(
    "You can see them in your studio dashboard:",
    DASHBOARD_URL,
    "",
    "— Mikey",
  );
  return lines.join("\n");
}

function buildHtmlBody(
  members: NewMember[],
  completions: CompletionWithStudent[],
): string {
  const sections: string[] = [];

  if (members.length > 0) {
    const names = members.map(
      (m) => m.display_name_override?.trim() || "A new student",
    );
    const greeting =
      members.length === 1
        ? `${escapeHtml(names[0])} just joined your studio on Mewstro.`
        : `${members.length} new students joined your studio:`;
    sections.push(`<p>${greeting}</p>`);
    if (members.length > 1) {
      const items = names
        .map((n) => `<li style="margin:4px 0;">${escapeHtml(n)}</li>`)
        .join("");
      sections.push(`<ul style="padding-left:20px;">${items}</ul>`);
    }
  }

  if (completions.length > 0) {
    const heading =
      completions.length === 1
        ? "And 1 assignment completion in the last 24 hours:"
        : `And ${completions.length} assignment completions in the last 24 hours:`;
    const items = completions
      .map(
        (c) =>
          `<li style="margin:4px 0;"><strong>${escapeHtml(c.student_name)}</strong> → ${escapeHtml(c.assignment_title)}</li>`,
      )
      .join("");
    sections.push(`<p>${heading}</p><ul style="padding-left:20px;">${items}</ul>`);
  }

  sections.push(
    `<p>You can see them in your studio dashboard:</p><p><a href="${DASHBOARD_URL}" style="color:#2D8B7E;font-weight:600;">${DASHBOARD_URL}</a></p>`,
    "<p>— Mikey</p>",
  );

  return `<!doctype html><html><body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1a1a1a;line-height:1.55;max-width:560px;margin:0 auto;padding:24px;"><p>Hi Ellie,</p>${sections.join("")}</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
