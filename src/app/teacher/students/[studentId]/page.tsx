import { isTeacherLoggedIn } from "@/lib/teacher-auth";
import {
  getStudentDetail,
  type SessionRow,
  type RepertoireRow,
  type MilestoneRow,
  type StudentAssignmentRow,
} from "@/lib/teacher-queries";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

function formatMinutes(mins: number): string {
  if (mins === 0) return "0m";
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function formatDateShort(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function relativeLabel(iso: string | null): string {
  if (!iso) return "Never";
  const diffDays = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} weeks ago`;
}

function statusBadge(status: string) {
  const styles: Record<string, string> = {
    learning: "bg-blue-50 text-blue-700 border-blue-200",
    polishing: "bg-[#2D8B7E]/10 text-[#2D8B7E] border-[#2D8B7E]/30",
    mastered: "bg-green-50 text-green-700 border-green-200",
    archived: "bg-gray-50 text-gray-600 border-gray-200",
  };
  const cls = styles[status] ?? styles.archived;
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${cls}`}
    >
      {status}
    </span>
  );
}

/**
 * 90-day contribution-style heatmap. Weeks are columns, days are rows
 * within each column. Colour intensity scales with practice minutes.
 */
function Heatmap({ data }: { data: Record<string, number> }) {
  // Build array of 91 days ending today, oldest first.
  const days: { date: Date; key: string; minutes: number }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    days.push({
      date: new Date(d),
      key,
      minutes: data[key] ?? 0,
    });
  }

  // Pad the start so the first column aligns to Monday (getDay: 0 = Sun)
  const firstDow = (days[0].date.getDay() + 6) % 7; // Mon = 0
  const padded: ({ date: Date; key: string; minutes: number } | null)[] = [
    ...Array(firstDow).fill(null),
    ...days,
  ];

  // Chunk into weeks of 7 (columns)
  const weeks: (typeof padded)[] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  function bgFor(minutes: number): string {
    if (minutes === 0) return "#F0EBE2";
    if (minutes < 15) return "#C6E3DE";
    if (minutes < 30) return "#8CC9BE";
    if (minutes < 60) return "#4FA999";
    return "#2D8B7E";
  }

  const dayLabels = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex gap-1">
        {/* Day-of-week labels */}
        <div className="flex flex-col justify-between pr-2 text-[10px] text-[#6B7280]">
          {dayLabels.map((label, i) => (
            <div key={i} className="h-3 leading-3">
              {label}
            </div>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) =>
              day ? (
                <div
                  key={di}
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: bgFor(day.minutes) }}
                  title={`${day.key}: ${day.minutes} min`}
                />
              ) : (
                <div key={di} className="h-3 w-3" />
              ),
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 text-[10px] text-[#6B7280]">
        <span>Less</span>
        <div className="flex gap-1">
          {[0, 10, 20, 45, 90].map((m) => (
            <div
              key={m}
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: bgFor(m) }}
            />
          ))}
        </div>
        <span>More</span>
        <span className="ml-4">Last 90 days · hover a cell for details</span>
      </div>
    </div>
  );
}

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  if (!(await isTeacherLoggedIn())) {
    redirect("/teacher/login");
  }

  const { studentId } = await params;
  const student = await getStudentDetail(studentId);

  if (!student) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Back link */}
      <Link
        href="/teacher"
        className="mb-6 inline-flex items-center gap-1 text-sm text-[#6B7280] hover:text-[#2D8B7E] transition-colors"
      >
        <span>←</span> Back to studio
      </Link>

      {/* Student header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1A2E]">
          {student.displayName}
        </h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          {student.studioName} · Last practised {relativeLabel(student.lastPracticeAt)}
        </p>
      </div>

      {/* Stat row */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatTile
          label="This week"
          value={formatMinutes(student.weekMinutes)}
          hint="last 7 days"
        />
        <StatTile
          label="This month"
          value={formatMinutes(student.monthMinutes)}
          hint={`${student.monthSessions} session${student.monthSessions === 1 ? "" : "s"}`}
        />
        <StatTile
          label="Current streak"
          value={
            student.currentStreak > 0
              ? `${student.currentStreak} day${student.currentStreak === 1 ? "" : "s"}`
              : "None"
          }
          hint={student.currentStreak > 0 ? "🔥 keep going" : "💤 nudge time"}
        />
        <StatTile
          label="Repertoire"
          value={String(student.repertoireCount)}
          hint={`${student.milestoneCount} milestone${student.milestoneCount === 1 ? "" : "s"}`}
        />
      </div>

      {/* Heatmap */}
      <div className="mb-10 rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Practice calendar</h2>
        <Heatmap data={student.heatmap} />
      </div>

      {/* Assignments */}
      {student.assignments.length > 0 && (
        <div className="mb-10 rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Assignments{" "}
              <span className="font-normal text-sm text-[#6B7280]">
                ({student.assignments.length})
              </span>
            </h2>
            <Link
              href="/teacher/assignments"
              className="text-xs font-medium text-[#2D8B7E] hover:underline"
            >
              Manage all →
            </Link>
          </div>
          <div className="space-y-3">
            {student.assignments.map((a) => (
              <StudentAssignmentCard key={a.id} assignment={a} />
            ))}
          </div>
        </div>
      )}

      {/* Two-column: Repertoire + Recent sessions */}
      <div className="mb-10 grid gap-6 lg:grid-cols-2">
        {/* Repertoire */}
        <div className="rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Repertoire{" "}
            <span className="font-normal text-sm text-[#6B7280]">
              ({student.repertoire.length})
            </span>
          </h2>
          {student.repertoire.length === 0 ? (
            <p className="text-sm text-[#6B7280]">
              No pieces yet. They&apos;ll appear here once the student adds
              any from the Repertoire tab in the app.
            </p>
          ) : (
            <div className="space-y-3">
              {student.repertoire.map((r) => (
                <RepertoireCard key={r.id} piece={r} />
              ))}
            </div>
          )}
        </div>

        {/* Recent sessions */}
        <div className="rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Recent sessions{" "}
            <span className="font-normal text-sm text-[#6B7280]">
              (last 30 days)
            </span>
          </h2>
          {student.recentSessions.length === 0 ? (
            <p className="text-sm text-[#6B7280]">No sessions yet.</p>
          ) : (
            <div className="max-h-[600px] space-y-3 overflow-y-auto pr-2">
              {student.recentSessions.map((s) => (
                <SessionCard key={s.id} session={s} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Milestones */}
      {student.milestones.length > 0 && (
        <div className="rounded-2xl border border-[#E8DFD3] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Milestone moments{" "}
            <span className="font-normal text-sm text-[#6B7280]">
              ({student.milestones.length})
            </span>
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {student.milestones.map((m) => (
              <MilestoneCard
                key={m.id}
                milestone={m}
                repertoire={student.repertoire}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StudentAssignmentCard({
  assignment,
}: {
  assignment: StudentAssignmentRow;
}) {
  const isComplete = assignment.completedAt !== null;

  const dueState = (() => {
    if (!assignment.dueDate) return null;
    const due = new Date(assignment.dueDate + "T23:59:59");
    const now = new Date();
    const diffDays = Math.floor(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (isComplete) return null;
    if (diffDays < 0) return { label: `Overdue ${Math.abs(diffDays)}d`, tone: "red" as const };
    if (diffDays === 0) return { label: "Due today", tone: "amber" as const };
    if (diffDays <= 2) return { label: `Due in ${diffDays}d`, tone: "amber" as const };
    return { label: `Due in ${diffDays}d`, tone: "neutral" as const };
  })();

  const toneStyles = {
    red: "bg-red-50 text-red-700 border-red-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    neutral: "bg-gray-50 text-gray-600 border-gray-200",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        isComplete
          ? "border-[#2D8B7E]/30 bg-[#2D8B7E]/5"
          : "border-[#E8DFD3] bg-[#FFFBF7]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {isComplete && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2D8B7E] text-white text-[11px] font-bold">
                ✓
              </span>
            )}
            <p className="font-semibold text-[#1A1A2E] truncate">
              {assignment.title}
            </p>
          </div>
          {assignment.description && (
            <p className="mt-1.5 text-sm text-[#5A4E42] line-clamp-2">
              {assignment.description}
            </p>
          )}
          {isComplete && assignment.completionNotes && (
            <p className="mt-2 text-xs italic text-[#2D8B7E]">
              &ldquo;{assignment.completionNotes}&rdquo;
            </p>
          )}
        </div>
        {dueState && (
          <span
            className={`flex-shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${toneStyles[dueState.tone]}`}
          >
            {dueState.label}
          </span>
        )}
        {isComplete && (
          <span className="flex-shrink-0 text-[10px] font-medium text-[#2D8B7E]">
            Done
          </span>
        )}
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E8DFD3] bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-[#6B7280]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-[#1A1A2E]">{value}</p>
      <p className="mt-1 text-xs text-[#6B7280]">{hint}</p>
    </div>
  );
}

function RepertoireCard({ piece }: { piece: RepertoireRow }) {
  return (
    <div className="rounded-xl border border-[#E8DFD3] bg-[#FFFBF7] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#1A1A2E] truncate">{piece.title}</p>
          {piece.artist && (
            <p className="text-sm text-[#6B7280] truncate">{piece.artist}</p>
          )}
        </div>
        {statusBadge(piece.status)}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-[#6B7280]">
        <span>{formatMinutes(piece.totalPracticeMinutes)} total</span>
        {piece.targetBpm && piece.currentBpm ? (
          <span>
            {piece.currentBpm}{" / "}
            <span className="text-[#2D8B7E] font-medium">
              {piece.targetBpm}
            </span>{" "}
            bpm
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SessionCard({ session }: { session: SessionRow }) {
  return (
    <div className="rounded-xl border border-[#E8DFD3] bg-[#FFFBF7] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#1A1A2E]">
              {formatMinutes(session.durationMinutes)}
            </span>
            <span className="text-xs text-[#6B7280]">
              · {session.taskType} · {session.instrumentType}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-[#6B7280]">
            {formatDateTime(session.sessionDate)}
          </p>
          {session.notes && (
            <p className="mt-2 text-sm text-[#5A4E42] italic">
              &ldquo;{session.notes}&rdquo;
            </p>
          )}
        </div>
        <div className="flex-shrink-0 text-right">
          {session.mood && (
            <p className="text-xs font-medium text-[#2D8B7E]">{session.mood}</p>
          )}
          {session.focusLevel !== null && (
            <p className="text-xs text-[#6B7280]">
              Focus {session.focusLevel}/5
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function MilestoneCard({
  milestone,
  repertoire,
}: {
  milestone: MilestoneRow;
  repertoire: RepertoireRow[];
}) {
  const piece = repertoire.find((r) => r.id === milestone.repertoireId);
  const description = (() => {
    switch (milestone.milestoneType) {
      case "bpm_increase":
        return `Reached ${milestone.newValue} bpm${milestone.previousValue ? ` (from ${milestone.previousValue})` : ""}`;
      case "status_change":
        return `Moved from ${milestone.previousValue} → ${milestone.newValue}`;
      case "first_complete_run":
        return milestone.newValue ?? "First complete run-through";
      default:
        return milestone.milestoneType;
    }
  })();

  return (
    <div className="rounded-xl border border-[#2D8B7E]/30 bg-[#2D8B7E]/5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2D8B7E] text-white">
          ⭐
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[#1A1A2E] truncate">
            {piece?.title ?? "Unknown piece"}
          </p>
          <p className="text-sm text-[#5A4E42]">{description}</p>
          <p className="mt-1 text-xs text-[#6B7280]">
            {formatDateShort(milestone.createdAt)} ·{" "}
            {milestone.durationSeconds.toFixed(1)}s video
          </p>
        </div>
      </div>
    </div>
  );
}
