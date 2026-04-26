import { NextRequest, NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase";

export const runtime = "nodejs";

interface IntakePayload {
  firstName: string;
  lastName: string;
  email: string;
  studioName?: string;
  location?: string;
  country?: string;
  estimatedStudentCount?: number;
  instruments?: string[];
  yearsTeaching?: number;
  howHeard?: string;
  notes?: string;
  consent: boolean;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  firstLandingPage?: string;
  referrer?: string;
}

const KNOWN_INSTRUMENTS = [
  "piano",
  "voice",
  "violin",
  "guitar",
  "drums",
  "brass",
  "woodwind",
  "strings",
  "other",
];

function stringField(value: unknown, max = 200): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function parsePayload(body: unknown): IntakePayload | { error: string } {
  if (typeof body !== "object" || body === null) {
    return { error: "Invalid payload" };
  }
  const raw = body as Record<string, unknown>;

  const firstName = stringField(raw.firstName, 80);
  const lastName = stringField(raw.lastName, 80);
  const email = stringField(raw.email, 200);
  const consent = raw.consent === true;

  if (!firstName) return { error: "First name is required" };
  if (!lastName) return { error: "Last name is required" };
  if (!email || !/.+@.+\..+/.test(email)) {
    return { error: "A valid email is required" };
  }
  if (!consent) {
    return { error: "Please confirm you agree to be contacted" };
  }

  const studentCountRaw =
    typeof raw.estimatedStudentCount === "number"
      ? raw.estimatedStudentCount
      : typeof raw.estimatedStudentCount === "string"
        ? Number(raw.estimatedStudentCount)
        : undefined;
  const estimatedStudentCount =
    typeof studentCountRaw === "number" && Number.isFinite(studentCountRaw)
      ? Math.max(0, Math.min(1000, Math.round(studentCountRaw)))
      : undefined;

  const yearsRaw =
    typeof raw.yearsTeaching === "number"
      ? raw.yearsTeaching
      : typeof raw.yearsTeaching === "string"
        ? Number(raw.yearsTeaching)
        : undefined;
  const yearsTeaching =
    typeof yearsRaw === "number" && Number.isFinite(yearsRaw)
      ? Math.max(0, Math.min(80, Math.round(yearsRaw)))
      : undefined;

  const instruments = Array.isArray(raw.instruments)
    ? raw.instruments
        .map((i) => (typeof i === "string" ? i.trim().toLowerCase() : ""))
        .filter((i) => KNOWN_INSTRUMENTS.includes(i))
    : [];

  return {
    firstName,
    lastName,
    email: email.toLowerCase(),
    studioName: stringField(raw.studioName, 150) ?? undefined,
    location: stringField(raw.location, 150) ?? undefined,
    country: stringField(raw.country, 80) ?? "UK",
    estimatedStudentCount,
    instruments,
    yearsTeaching,
    howHeard: stringField(raw.howHeard, 500) ?? undefined,
    notes: stringField(raw.notes, 2000) ?? undefined,
    consent: true,
    utmSource: stringField(raw.utmSource, 120) ?? undefined,
    utmMedium: stringField(raw.utmMedium, 120) ?? undefined,
    utmCampaign: stringField(raw.utmCampaign, 120) ?? undefined,
    utmContent: stringField(raw.utmContent, 120) ?? undefined,
    utmTerm: stringField(raw.utmTerm, 120) ?? undefined,
    firstLandingPage: stringField(raw.firstLandingPage, 500) ?? undefined,
    referrer: stringField(raw.referrer, 500) ?? undefined,
  };
}

// Fire a Tealium collect beacon server-side so ad-blockers can't nuke the
// conversion event. Non-blocking (keepalive), never throws. Requires the
// standard NEXT_PUBLIC_TEALIUM_* env vars used by the client script.
function fireServerBeacon(
  event: string,
  data: Record<string, unknown>,
): void {
  const account = process.env.NEXT_PUBLIC_TEALIUM_ACCOUNT;
  const profile = process.env.NEXT_PUBLIC_TEALIUM_PROFILE;
  if (!account || !profile) return;
  try {
    const payload = {
      tealium_account: account,
      tealium_profile: profile,
      tealium_event: event,
      event_name: event,
      ...data,
    };
    // Intentionally no await — this is a fire-and-forget mirror of the
    // client event. keepalive allows the request to outlive the handler.
    void fetch("https://collect.tealiumiq.com/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Analytics must never break the page.
    });
  } catch {
    // ignore
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parsePayload(body);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const supabase = getServerSupabase();

  // Upsert teacher row. If the email matches an existing scraped lead,
  // flip lifecycle_stage to "waitlist" and mark the source as inbound.
  const teacherPayload = {
    first_name: parsed.firstName,
    last_name: parsed.lastName,
    email: parsed.email,
    studio_name: parsed.studioName ?? null,
    teaching_location: parsed.location ?? null,
    country: parsed.country ?? "UK",
    estimated_student_count: parsed.estimatedStudentCount ?? null,
    instruments: parsed.instruments ?? [],
    lifecycle_stage: "waitlist",
    source: "website_application",
    notes: parsed.notes ?? null,
    updated_at: new Date().toISOString(),
  };

  const { data: teacher, error: upsertErr } = await supabase
    .from("mewstro_teachers")
    .upsert(teacherPayload, { onConflict: "email" })
    .select("id")
    .single();

  if (upsertErr || !teacher) {
    console.error("teacher-intake upsert failed", upsertErr);
    return NextResponse.json(
      { error: "Something went wrong saving your application." },
      { status: 500 },
    );
  }

  // Log the inbound application with full context for the CRM.
  const metadata: Record<string, unknown> = {
    years_teaching: parsed.yearsTeaching ?? null,
    how_heard: parsed.howHeard ?? null,
    utm: {
      source: parsed.utmSource ?? null,
      medium: parsed.utmMedium ?? null,
      campaign: parsed.utmCampaign ?? null,
      content: parsed.utmContent ?? null,
      term: parsed.utmTerm ?? null,
    },
    first_landing_page: parsed.firstLandingPage ?? null,
    referrer: parsed.referrer ?? null,
    user_agent: req.headers.get("user-agent") ?? null,
  };

  const { error: activityErr } = await supabase
    .from("mewstro_outreach_activities")
    .insert({
      teacher_id: teacher.id,
      activity_type: "inbound_application",
      subject: "Founding Teacher waitlist application",
      body: parsed.notes ?? null,
      metadata,
      performed_by: "website",
    });

  if (activityErr) {
    // Non-fatal — the primary record is saved. Log for visibility.
    console.error("teacher-intake activity log failed", activityErr);
  }

  // Server-side Tealium beacon mirror — rescues attribution from ad-blockers
  // that kill the client-side teacher_apply_submitted event. Fire-and-forget.
  fireServerBeacon("teacher_apply_submitted_server", {
    brand: "teacher",
    page_type: "apply",
    country: parsed.country ?? null,
    estimated_student_count: parsed.estimatedStudentCount ?? null,
    instruments_count: parsed.instruments?.length ?? 0,
    has_studio_name: parsed.studioName ? "true" : "false",
    utm_source: parsed.utmSource ?? "",
    utm_medium: parsed.utmMedium ?? "",
    utm_campaign: parsed.utmCampaign ?? "",
    utm_content: parsed.utmContent ?? "",
    utm_term: parsed.utmTerm ?? "",
    first_landing_page: parsed.firstLandingPage ?? "",
    referrer: parsed.referrer ?? "",
  });

  return NextResponse.json({ ok: true });
}
