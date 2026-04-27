"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { pdf } from "@react-pdf/renderer";
import { StudentWelcomePDF } from "./StudentWelcomePDF";
import { ParentOnePagerPDF } from "./ParentOnePagerPDF";
import { FridgeSheetPDF } from "./FridgeSheetPDF";
import { TeacherAssetVars, DEFAULT_VARS } from "./types";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
  { ssr: false, loading: () => <PreviewSkeleton /> },
);

type PreviewKey = "student" | "parent" | "fridge";

const PRESET_COLOURS = [
  { name: "Mewstro teal", hex: "#2D8B7E" },
  { name: "Studio coral", hex: "#F4845F" },
  { name: "Conservatory plum", hex: "#7C3AED" },
  { name: "Concert navy", hex: "#1E3A8A" },
  { name: "Forest", hex: "#3B826E" },
  { name: "Charcoal", hex: "#1A1A2E" },
];

export function AssetGenerator() {
  const [teacherFullName, setTeacherFullName] = useState("");
  const [studioName, setStudioName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [accentColor, setAccentColor] = useState("#2D8B7E");
  const [preview, setPreview] = useState<PreviewKey>("student");
  const [downloading, setDownloading] = useState<PreviewKey | null>(null);

  const teacherFirstName = useMemo(() => {
    const first = teacherFullName.trim().split(/\s+/)[0];
    return first || "";
  }, [teacherFullName]);

  const ready =
    teacherFullName.trim().length > 0 &&
    studioName.trim().length > 0 &&
    inviteCode.trim().length > 0;

  const vars: TeacherAssetVars = useMemo(
    () => ({
      teacherName: teacherFirstName || DEFAULT_VARS.teacherName,
      teacherFullName: teacherFullName.trim() || DEFAULT_VARS.teacherFullName,
      studioName: studioName.trim() || DEFAULT_VARS.studioName,
      inviteCode: inviteCode.trim().toUpperCase() || DEFAULT_VARS.inviteCode,
      accentColor,
    }),
    [teacherFirstName, teacherFullName, studioName, inviteCode, accentColor],
  );

  async function downloadPdf(key: PreviewKey) {
    setDownloading(key);
    try {
      const doc =
        key === "student" ? (
          <StudentWelcomePDF vars={vars} />
        ) : key === "parent" ? (
          <ParentOnePagerPDF vars={vars} />
        ) : (
          <FridgeSheetPDF vars={vars} />
        );

      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const slug = vars.studioName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const filenames: Record<PreviewKey, string> = {
        student: `${slug}-mewstro-student-welcome.pdf`,
        parent: `${slug}-mewstro-parent-note.pdf`,
        fridge: `${slug}-mewstro-fridge-tracker.pdf`,
      };
      a.href = url;
      a.download = filenames[key];
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  }

  const previewDoc =
    preview === "student" ? (
      <StudentWelcomePDF vars={vars} />
    ) : preview === "parent" ? (
      <ParentOnePagerPDF vars={vars} />
    ) : (
      <FridgeSheetPDF vars={vars} />
    );

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="rounded-3xl border border-[#E8DFD3] bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-[#1A1A2E]">
          Studio details
        </h2>
        <p className="mt-1 text-sm text-[#6B7280]">
          Fill these in and the handouts update on the right. Nothing is
          saved or sent anywhere, the PDF is built in your browser.
        </p>

        <Field
          label="Your name"
          hint="As your students would see it. e.g. Ellie Moorhouse"
        >
          <input
            type="text"
            value={teacherFullName}
            onChange={(e) => setTeacherFullName(e.target.value)}
            maxLength={120}
            className={inputClass}
            placeholder="Ellie Moorhouse"
          />
        </Field>

        <Field
          label="Studio name"
          hint="If you teach under your own name, use that. e.g. Moorhouse Music."
        >
          <input
            type="text"
            value={studioName}
            onChange={(e) => setStudioName(e.target.value)}
            maxLength={150}
            className={inputClass}
            placeholder="Moorhouse Music"
          />
        </Field>

        <Field
          label="Invite code"
          hint="Find this in Mewstro under Settings → Studio. Students will type this exactly."
        >
          <input
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            maxLength={32}
            className={`${inputClass} font-mono uppercase tracking-wider`}
            placeholder="MOOR-7842"
          />
        </Field>

        <Field
          label="Accent colour"
          hint="Pick one of the presets or type a hex code. Will recolour the headers, buttons, and footers."
        >
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESET_COLOURS.map((c) => (
              <button
                key={c.hex}
                type="button"
                onClick={() => setAccentColor(c.hex)}
                title={c.name}
                aria-label={c.name}
                className={`h-9 w-9 rounded-full border-2 transition-transform hover:scale-110 ${
                  accentColor === c.hex
                    ? "border-[#1A1A2E]"
                    : "border-white shadow-sm"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="h-10 w-12 cursor-pointer rounded-md border border-[#E8DFD3] bg-white"
            />
            <input
              type="text"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              maxLength={7}
              className={`${inputClass} font-mono uppercase`}
              placeholder="#2D8B7E"
            />
          </div>
        </Field>

        <div className="mt-8 space-y-3">
          <DownloadButton
            label="Download Student Welcome (PDF)"
            sublabel="2 pages, hand to every student in the studio"
            disabled={!ready || downloading !== null}
            loading={downloading === "student"}
            onClick={() => downloadPdf("student")}
            primary
          />
          <DownloadButton
            label="Download Parent Note (PDF)"
            sublabel="2 pages, share with parents of under-16s"
            disabled={!ready || downloading !== null}
            loading={downloading === "parent"}
            onClick={() => downloadPdf("parent")}
          />
          <DownloadButton
            label="Download Fridge Tracker (PDF)"
            sublabel="1 page, sticks on the practice room wall"
            disabled={!ready || downloading !== null}
            loading={downloading === "fridge"}
            onClick={() => downloadPdf("fridge")}
          />
        </div>

        {!ready && (
          <p className="mt-4 text-xs text-[#6B7280]">
            Fill in your name, studio, and invite code to enable downloads.
          </p>
        )}
      </div>

      <div className="rounded-3xl border border-[#E8DFD3] bg-white p-4 shadow-sm md:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <PreviewTab
            active={preview === "student"}
            onClick={() => setPreview("student")}
          >
            Student Welcome
          </PreviewTab>
          <PreviewTab
            active={preview === "parent"}
            onClick={() => setPreview("parent")}
          >
            Parent Note
          </PreviewTab>
          <PreviewTab
            active={preview === "fridge"}
            onClick={() => setPreview("fridge")}
          >
            Fridge Tracker
          </PreviewTab>
        </div>
        <div
          className="overflow-hidden rounded-2xl border border-[#E8DFD3]"
          style={{ height: "calc(100vh - 280px)", minHeight: 600 }}
        >
          <PDFViewer
            width="100%"
            height="100%"
            showToolbar={false}
            style={{ border: 0 }}
          >
            {previewDoc}
          </PDFViewer>
        </div>
        <p className="mt-3 text-xs text-[#6B7280]">
          Live preview. Edit the form on the left and the document updates.
        </p>
      </div>
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div
      className="flex items-center justify-center bg-[#FAF6EF] text-sm text-[#6B7280]"
      style={{ height: "100%" }}
    >
      Loading preview…
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <label className="block text-sm font-semibold text-[#1A1A2E]">
        {label}
      </label>
      {hint && <p className="mt-0.5 text-xs text-[#6B7280]">{hint}</p>}
      {children}
    </div>
  );
}

function DownloadButton({
  label,
  sublabel,
  onClick,
  disabled,
  loading,
  primary,
}: {
  label: string;
  sublabel: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-2xl border px-5 py-4 text-left transition-colors ${
        primary
          ? "border-[#2D8B7E] bg-[#2D8B7E] text-white hover:bg-[#246F64] disabled:bg-[#9DC8C0] disabled:border-[#9DC8C0]"
          : "border-[#E8DFD3] bg-white text-[#1A1A2E] hover:border-[#2D8B7E] disabled:opacity-50"
      } disabled:cursor-not-allowed`}
    >
      <div className="text-sm font-semibold">
        {loading ? "Building PDF…" : label}
      </div>
      <div
        className={`mt-0.5 text-xs ${
          primary ? "text-white/80" : "text-[#6B7280]"
        }`}
      >
        {sublabel}
      </div>
    </button>
  );
}

function PreviewTab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "bg-[#2D8B7E] text-white"
          : "bg-white text-[#5A4E42] border border-[#E8DFD3] hover:border-[#2D8B7E]/50"
      }`}
    >
      {children}
    </button>
  );
}

const inputClass =
  "mt-2 w-full rounded-xl border border-[#E8DFD3] bg-white px-4 py-3 text-sm text-[#1A1A2E] shadow-sm outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-[#2D8B7E] focus:ring-2 focus:ring-[#2D8B7E]/20";
