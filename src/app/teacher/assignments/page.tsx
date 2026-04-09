import { isTeacherLoggedIn } from "@/lib/teacher-auth";
import {
  getAssignmentsForStudio,
  getStudioOverview,
  type AssignmentRow,
} from "@/lib/teacher-queries";
import { redirect } from "next/navigation";
import Link from "next/link";

function formatDueDate(dueIso: string | null): {
  label: string;
  urgency: "overdue" | "soon" | "ok" | "none";
} {
  if (!dueIso) return { label: "No due date", urgency: "none" };
  const due = new Date(dueIso + "T23:59:59");
  const now = new Date();
  const diffDays = Math.floor(
    (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (diffDays < 0) {
    return {
      label: `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? "" : "s"}`,
      urgency: "overdue",
    };
  }
  if (diffDays === 0) return { label: "Due today", urgency: "soon" };
  if (diffDays === 1) return { label: "Due tomorrow", urgency: "soon" };
  if (diffDays <= 3) return { label: `Due in ${diffDays} days`, urgency: "soon" };
  return { label: `Due in ${diffDays} days`, urgency: "ok" };
}

function formatRelative(iso: string): string {
  const diffDays = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} weeks ago`;
}

export default async function AssignmentsPage() {
  if (!(await isTeacherLoggedIn())) {
    redirect("/teacher/login");
  }

  const [assignments, overview] = await Promise.all([
    getAssignmentsForStudio(),
    getStudioOverview(),
  ]);

  const activeAssignments = assignments.filter((a) => {
    if (!a.dueDate) return true;
    const due = new Date(a.dueDate + "T23:59:59");
    return due >= new Date() || a.completedCount < a.targetCount;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Breadcrumb */}
      <Link
        href="/teacher"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#2D8B7E] transition-colors"
      >
        <span>←</span> Back to studio
      </Link>

      {/* Header */}
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Set tasks for your studio and see who&apos;s done them.
          </p>
        </div>
        <Link
          href="/teacher/assignments/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#2D8B7E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#246F64] transition-colors"
        >
          <span className="text-lg leading-none">+</span> New assignment
        </Link>
      </div>

      {/* Summary stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <StatCard
          label="Active assignments"
          value={String(activeAssignments.length)}
        />
        <StatCard
          label="Total completions"
          value={String(
            assignments.reduce((s, a) => s + a.completedCount, 0),
          )}
        />
        <StatCard
          label="Completion rate"
          value={(() => {
            const totalTargets = assignments.reduce(
              (s, a) => s + a.targetCount,
              0,
            );
            const totalDone = assignments.reduce(
              (s, a) => s + a.completedCount,
              0,
            );
            return totalTargets > 0
              ? `${Math.round((totalDone / totalTargets) * 100)}%`
              : "—";
          })()}
        />
      </div>

      {/* Assignment list */}
      {assignments.length === 0 ? (
        <div className="rounded-2xl border border-[#E8DFD3] bg-white p-16 text-center shadow-sm">
          <p className="text-lg font-medium">No assignments yet</p>
          <p className="mt-2 text-sm text-[#6B7280]">
            Tap &ldquo;New assignment&rdquo; above to set your first task.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((a) => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </div>
      )}

      {/* What your students see — iOS preview */}
      <div className="mt-12 rounded-2xl border border-[#E8DFD3] bg-[#FAF6EF] p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex h-6 items-center rounded-full bg-[#2D8B7E] px-3 text-xs font-bold uppercase tracking-wider text-white">
            Coming next update
          </span>
        </div>
        <h3 className="text-lg font-semibold">
          What your students will see
        </h3>
        <p className="mt-2 text-sm text-[#5A4E42]">
          When the next Mewstro build lands on your students&apos; phones,
          assignments will show up in their Profile tab inside the app.
          Here&apos;s the preview:
        </p>

        <div className="mt-6 flex justify-center">
          <IOSAssignmentPreview
            count={overview.totalStudents > 0 ? 1 : 0}
            title={assignments[0]?.title ?? "Practice your scales this week"}
            dueLabel={
              assignments[0]
                ? formatDueDate(assignments[0].dueDate).label
                : "Due Sunday"
            }
            description={
              assignments[0]?.description?.slice(0, 120) ??
              "Work through C major, G major, and D major scales slowly with the metronome…"
            }
          />
        </div>

        <p className="mt-6 text-xs text-[#6B7280]">
          Today, Ellie&apos;s dashboard is the whole story. The in-app
          inbox ships in v1.1 once the pilot has validated the teacher
          side.
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#E8DFD3] bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-[#1A1A2E]">{value}</p>
    </div>
  );
}

function AssignmentCard({ assignment }: { assignment: AssignmentRow }) {
  const due = formatDueDate(assignment.dueDate);
  const completionPct =
    assignment.targetCount > 0
      ? Math.round(
          (assignment.completedCount / assignment.targetCount) * 100,
        )
      : 0;

  const urgencyStyles = {
    overdue: "bg-red-50 text-red-700 border-red-200",
    soon: "bg-amber-50 text-amber-700 border-amber-200",
    ok: "bg-[#2D8B7E]/10 text-[#2D8B7E] border-[#2D8B7E]/20",
    none: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <div className="rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm hover:border-[#2D8B7E]/40 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold truncate">
              {assignment.title}
            </h3>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${urgencyStyles[due.urgency]}`}
            >
              {due.label}
            </span>
          </div>
          {assignment.description && (
            <p className="mt-2 text-sm text-[#5A4E42] line-clamp-2">
              {assignment.description}
            </p>
          )}
          <p className="mt-2 text-xs text-[#6B7280]">
            Set {formatRelative(assignment.createdAt)}
          </p>
        </div>

        <div className="flex-shrink-0 text-right">
          <p className="text-3xl font-bold text-[#1A1A2E]">
            {assignment.completedCount}
            <span className="text-lg text-[#6B7280]">
              /{assignment.targetCount}
            </span>
          </p>
          <p className="text-xs text-[#6B7280]">completed</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#F0EBE2]">
        <div
          className="h-full bg-[#2D8B7E] transition-all"
          style={{ width: `${completionPct}%` }}
        />
      </div>

      {/* Target + completion chips */}
      {assignment.targets.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {assignment.targets.map((t) => {
            const isDone = assignment.completions.some(
              (c) => c.userId === t.userId,
            );
            return (
              <span
                key={t.userId}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                  isDone
                    ? "bg-[#2D8B7E] text-white border-[#2D8B7E]"
                    : "bg-white text-[#5A4E42] border-[#E8DFD3]"
                }`}
              >
                {isDone && <span>✓</span>}
                {t.displayName}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * A static visual preview of what the iOS assignment inbox will look
 * like. This is illustration only — no real iOS code runs here. Helps
 * Ellie see the full teacher→student loop without needing a TestFlight
 * build on her students' phones.
 */
function IOSAssignmentPreview({
  title,
  dueLabel,
  description,
}: {
  count: number;
  title: string;
  dueLabel: string;
  description: string;
}) {
  return (
    <div className="w-[280px] rounded-[32px] bg-[#1A1A2E] p-3 shadow-xl">
      <div className="rounded-[24px] bg-white p-5">
        {/* Fake header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-medium text-[#6B7280]">9:41</p>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-[#1A1A2E]/20" />
            <div className="h-2 w-2 rounded-full bg-[#1A1A2E]/20" />
            <div className="h-2 w-2 rounded-full bg-[#1A1A2E]/40" />
          </div>
        </div>

        <h4 className="text-lg font-bold text-[#1A1A2E]">Assignments</h4>
        <p className="mt-0.5 text-xs text-[#6B7280]">
          From Ellie Moorhouse&apos;s Studio
        </p>

        <div className="mt-4 space-y-3">
          {/* Primary assignment card */}
          <div className="rounded-xl border border-[#2D8B7E]/30 bg-[#2D8B7E]/5 p-4">
            <div className="flex items-start gap-2">
              <span className="text-base">📝</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A1A2E] leading-tight">
                  {title}
                </p>
                <p className="mt-1 text-[10px] font-medium text-[#2D8B7E]">
                  {dueLabel}
                </p>
                <p className="mt-2 text-[11px] text-[#5A4E42] line-clamp-3 leading-snug">
                  {description}
                </p>
              </div>
            </div>
            <button
              disabled
              className="mt-3 w-full rounded-lg bg-[#2D8B7E] py-2 text-xs font-semibold text-white"
            >
              Mark complete
            </button>
          </div>

          {/* Subtle "more" placeholder */}
          <div className="rounded-xl border border-[#E8DFD3] bg-[#FAF6EF] p-3">
            <p className="text-[10px] text-[#6B7280]">
              + more assignments appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
