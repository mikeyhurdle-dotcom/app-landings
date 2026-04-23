"use client";

import { useState, useMemo, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const INSTRUMENTS = [
  { id: "piano", label: "Piano" },
  { id: "voice", label: "Voice" },
  { id: "violin", label: "Violin" },
  { id: "guitar", label: "Guitar" },
  { id: "drums", label: "Drums" },
  { id: "brass", label: "Brass" },
  { id: "woodwind", label: "Woodwind" },
  { id: "strings", label: "Other strings" },
  { id: "other", label: "Other" },
];

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

function TeacherApplyForm() {
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
  const [selectedInstruments, setSelectedInstruments] = useState<Set<string>>(
    new Set(),
  );

  const searchParams = useSearchParams();
  const utm = useMemo(
    () => ({
      source: searchParams.get("utm_source") ?? undefined,
      medium: searchParams.get("utm_medium") ?? undefined,
      campaign: searchParams.get("utm_campaign") ?? undefined,
      content: searchParams.get("utm_content") ?? undefined,
      referrer:
        typeof document !== "undefined" ? document.referrer || undefined : undefined,
    }),
    [searchParams],
  );

  function toggleInstrument(id: string) {
    setSelectedInstruments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmit({ status: "submitting" });

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      studioName: data.get("studioName") || undefined,
      location: data.get("location") || undefined,
      country: data.get("country") || "UK",
      estimatedStudentCount: data.get("estimatedStudentCount")
        ? Number(data.get("estimatedStudentCount"))
        : undefined,
      yearsTeaching: data.get("yearsTeaching")
        ? Number(data.get("yearsTeaching"))
        : undefined,
      instruments: Array.from(selectedInstruments),
      howHeard: data.get("howHeard") || undefined,
      notes: data.get("notes") || undefined,
      consent: data.get("consent") === "on",
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
      utmContent: utm.content,
      referrer: utm.referrer,
    };

    try {
      const res = await fetch("/api/teacher-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setSubmit({
          status: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      setSubmit({ status: "success" });
    } catch {
      setSubmit({
        status: "error",
        message: "Network error. Please try again.",
      });
    }
  }

  if (submit.status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-3xl border border-[#2D8B7E]/30 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#2D8B7E]/10">
            <Image
              src="/mewstro/mascot-celebrating.png"
              alt=""
              width={64}
              height={64}
            />
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A2E]">
            You&apos;re on the Founding Teacher waitlist.
          </h1>
          <p className="mt-4 text-base text-[#5A4E42]">
            Mewstro is in final pilot with Ellie Moorhouse, my own piano
            teacher and founding studio. Once her studio has been running
            on Mewstro for two weeks, I&apos;ll open the first five
            Founding Studio slots, and you&apos;ll be among the first
            people I contact.
          </p>
          <div className="mt-8 rounded-2xl bg-[#FAF6EF] p-6 text-left text-sm text-[#5A4E42]">
            <p className="font-semibold text-[#1A1A2E]">
              What happens next:
            </p>
            <ol className="mt-3 space-y-2">
              <li>
                <strong>1.</strong> Our founding pilot with Ellie wraps up
                (2&ndash;3 weeks from now).
              </li>
              <li>
                <strong>2.</strong> I email you personally to set up a
                15-minute call, in order of application.
              </li>
              <li>
                <strong>3.</strong> Founding Studios get 50% off for life,
                a direct line to me, and first say on where Mewstro goes
                next. Five spots only.
              </li>
            </ol>
          </div>
          <p className="mt-8 text-sm text-[#6B7280]">
            In the meantime, if you&apos;d like to read the story behind
            Mewstro, it&apos;s{" "}
            <Link
              href="/mewstro/story"
              className="font-semibold text-[#2D8B7E] hover:underline"
            >
              here
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-14 md:py-20">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#2D8B7E]">
          Founding Teacher waitlist
        </p>
        <h1 className="mt-2 text-4xl font-bold text-[#1A1A2E] md:text-5xl">
          Be one of the first five studios.
        </h1>
        <p className="mt-5 text-base text-[#5A4E42] md:text-lg">
          Mewstro is in final pilot with my own piano teacher Ellie as our
          founding studio. Apply now and I&apos;ll speak to you personally
          about joining the Founding Studios cohort. You get 50% off for
          life, a direct line to me, and first say on where the product
          goes next. Five slots, by application only.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-3xl border border-[#E8DFD3] bg-white p-8 shadow-sm md:p-10"
      >
        {/* Name + email */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="First name" required>
            <input
              type="text"
              name="firstName"
              required
              maxLength={80}
              className={inputClass}
              autoComplete="given-name"
            />
          </Field>
          <Field label="Last name" required>
            <input
              type="text"
              name="lastName"
              required
              maxLength={80}
              className={inputClass}
              autoComplete="family-name"
            />
          </Field>
        </div>
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            maxLength={200}
            className={inputClass}
            autoComplete="email"
          />
        </Field>

        {/* Studio */}
        <Field
          label="Studio name"
          hint="Leave blank if you teach under your own name."
        >
          <input
            type="text"
            name="studioName"
            maxLength={150}
            className={inputClass}
          />
        </Field>

        {/* Location */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="City / town">
            <input
              type="text"
              name="location"
              maxLength={150}
              className={inputClass}
              placeholder="Oxford, UK"
              autoComplete="address-level2"
            />
          </Field>
          <Field label="Country">
            <input
              type="text"
              name="country"
              defaultValue="UK"
              maxLength={80}
              className={inputClass}
              autoComplete="country"
            />
          </Field>
        </div>

        {/* Students + years */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field
            label="How many students do you teach?"
            hint="A rough number is fine."
          >
            <input
              type="number"
              name="estimatedStudentCount"
              min={0}
              max={1000}
              step={1}
              className={inputClass}
              inputMode="numeric"
            />
          </Field>
          <Field label="Years teaching">
            <input
              type="number"
              name="yearsTeaching"
              min={0}
              max={80}
              step={1}
              className={inputClass}
              inputMode="numeric"
            />
          </Field>
        </div>

        {/* Instruments */}
        <Field
          label="Instruments you teach"
          hint="Pick all that apply."
        >
          <div className="mt-2 flex flex-wrap gap-2">
            {INSTRUMENTS.map((i) => {
              const selected = selectedInstruments.has(i.id);
              return (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => toggleInstrument(i.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    selected
                      ? "border-[#2D8B7E] bg-[#2D8B7E] text-white"
                      : "border-[#E8DFD3] bg-white text-[#5A4E42] hover:border-[#2D8B7E]/50"
                  }`}
                  aria-pressed={selected}
                >
                  {i.label}
                </button>
              );
            })}
          </div>
        </Field>

        {/* How heard */}
        <Field
          label="How did you hear about Mewstro?"
          hint="Directory, social media, another teacher, a search. Anything you can remember is useful."
        >
          <input
            type="text"
            name="howHeard"
            maxLength={500}
            className={inputClass}
          />
        </Field>

        {/* Notes */}
        <Field
          label="Anything you'd like me to know?"
          hint="Optional. What you're hoping Mewstro can do, what other tools you've tried, studio specifics."
        >
          <textarea
            name="notes"
            maxLength={2000}
            rows={4}
            className={`${inputClass} resize-y`}
          />
        </Field>

        {/* Consent */}
        <div className="mt-6">
          <label className="flex items-start gap-3 text-sm text-[#5A4E42]">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-0.5 h-4 w-4 rounded border-[#E8DFD3] text-[#2D8B7E] focus:ring-[#2D8B7E]"
            />
            <span>
              I&apos;m happy to be contacted about my application and
              Mewstro&apos;s Founding Teacher programme. You won&apos;t be
              added to any mailing list.
            </span>
          </label>
        </div>

        {submit.status === "error" && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {submit.message}
          </p>
        )}

        <div className="mt-8 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#6B7280]">
            No spam. I read every application personally.
          </p>
          <button
            type="submit"
            disabled={submit.status === "submitting"}
            className="rounded-full bg-[#2D8B7E] px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60"
          >
            {submit.status === "submitting"
              ? "Submitting..."
              : "Join the Founding Teacher waitlist"}
          </button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-[#6B7280]">
        Not a teacher? Mewstro for solo learners lives{" "}
        <Link
          href="/mewstro/app"
          className="font-semibold text-[#2D8B7E] hover:underline"
        >
          here
        </Link>
        .
      </p>
    </div>
  );
}

export default function TeacherApplyPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-6 py-14" />}>
      <TeacherApplyForm />
    </Suspense>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-[#E8DFD3] bg-white px-4 py-3 text-sm text-[#1A1A2E] shadow-sm outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#2D8B7E] focus:ring-2 focus:ring-[#2D8B7E]/20";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <label className="block text-sm font-semibold text-[#1A1A2E]">
        {label}
        {required && <span className="ml-1 text-[#2D8B7E]">*</span>}
      </label>
      {hint && (
        <p className="mt-0.5 text-xs text-[#6B7280]">{hint}</p>
      )}
      {children}
    </div>
  );
}
