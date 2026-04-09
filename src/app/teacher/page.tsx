import { isTeacherLoggedIn } from "@/lib/teacher-auth";
import { getStudioOverview } from "@/lib/teacher-queries";
import { redirect } from "next/navigation";
import Link from "next/link";

function formatRelativeTime(iso: string | null): string {
  if (!iso) return "Never";
  const date = new Date(iso);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

function formatMinutes(mins: number): string {
  if (mins === 0) return "0";
  if (mins < 60) return `${mins}m`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

function instrumentBadges(instruments: string[]) {
  if (instruments.length === 0) {
    return <span className="text-xs text-[#6B7280]">—</span>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {instruments.map((inst) => (
        <span
          key={inst}
          className="inline-flex items-center rounded-md bg-[#F0EBE2] px-2 py-0.5 text-xs font-medium text-[#5A4E42]"
        >
          {inst}
        </span>
      ))}
    </div>
  );
}

function engagementIndicator(weekMinutes: number, streak: number): string {
  if (streak >= 7 && weekMinutes >= 120) return "🔥 On fire";
  if (streak >= 3 && weekMinutes >= 60) return "✅ On track";
  if (weekMinutes > 0) return "🌱 Active";
  if (streak === 0 && weekMinutes === 0) return "💤 Quiet";
  return "📉 Slipping";
}

export default async function TeacherDashboardPage() {
  // Auth check — layout already renders regardless, but we need to gate
  // the actual data fetch to stop unauthed hits going to Supabase.
  if (!(await isTeacherLoggedIn())) {
    redirect("/teacher/login");
  }

  const overview = await getStudioOverview();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Studio header */}
      <div className="mb-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#2D8B7E]">
              {overview.teacherName}
            </p>
            <h1 className="mt-1 text-3xl font-bold text-[#1A1A2E]">
              {overview.studioName}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-[#E8DFD3] bg-white px-4 py-2">
              <p className="text-xs uppercase tracking-wider text-[#6B7280]">
                Invite code
              </p>
              <p className="font-mono text-lg font-bold text-[#2D8B7E]">
                {overview.inviteCode}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          label="Students"
          value={String(overview.totalStudents)}
          subtext="in your studio"
        />
        <StatCard
          label="Active this week"
          value={String(overview.activeThisWeek)}
          subtext={`of ${overview.totalStudents}`}
          accent={
            overview.activeThisWeek === overview.totalStudents
              ? "#2D8B7E"
              : undefined
          }
        />
        <StatCard
          label="Total minutes"
          value={formatMinutes(overview.totalWeekMinutes)}
          subtext="this week"
        />
        <StatCard
          label="Average"
          value={
            overview.activeThisWeek > 0
              ? formatMinutes(
                  Math.round(
                    overview.totalWeekMinutes / overview.activeThisWeek,
                  ),
                )
              : "—"
          }
          subtext="per active student"
        />
      </div>

      {/* Student table */}
      <div className="overflow-hidden rounded-2xl border border-[#E8DFD3] bg-white shadow-sm">
        <div className="border-b border-[#E8DFD3] px-6 py-4">
          <h2 className="text-lg font-semibold">Your students</h2>
          <p className="mt-0.5 text-sm text-[#6B7280]">
            Sorted by practice minutes this week. Click a student to see
            their full detail.
          </p>
        </div>

        {overview.students.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="text-[#6B7280]">No students yet.</p>
            <p className="mt-2 text-sm text-[#9CA3AF]">
              Share your invite code{" "}
              <span className="font-mono font-bold">
                {overview.inviteCode}
              </span>{" "}
              with your students to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#FAF6EF] text-left text-xs uppercase tracking-wider text-[#6B7280]">
                <tr>
                  <th className="px-6 py-3 font-medium">Student</th>
                  <th className="px-6 py-3 font-medium">Instruments</th>
                  <th className="px-6 py-3 font-medium">Streak</th>
                  <th className="px-6 py-3 font-medium">Last session</th>
                  <th className="px-6 py-3 font-medium">This week</th>
                  <th className="px-6 py-3 font-medium">This month</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8DFD3]">
                {overview.students.map((s, idx) => (
                  <tr
                    key={s.userId}
                    className="group hover:bg-[#FFFBF7] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/teacher/students/${s.userId}`}
                        className="flex items-center gap-3"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2D8B7E]/10 text-sm font-semibold text-[#2D8B7E]">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-[#1A1A2E] group-hover:text-[#2D8B7E] transition-colors">
                          {s.displayName}
                        </span>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      {instrumentBadges(s.instruments)}
                    </td>
                    <td className="px-6 py-4">
                      {s.currentStreak > 0 ? (
                        <span className="inline-flex items-center gap-1 text-sm">
                          <span>🔥</span>
                          <span className="font-semibold">
                            {s.currentStreak}
                          </span>
                          <span className="text-[#6B7280]">
                            day{s.currentStreak === 1 ? "" : "s"}
                          </span>
                        </span>
                      ) : (
                        <span className="text-sm text-[#9CA3AF]">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {formatRelativeTime(s.lastPracticeAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#1A1A2E]">
                        {formatMinutes(s.weekMinutes)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {formatMinutes(s.monthMinutes)}{" "}
                      <span className="text-xs text-[#9CA3AF]">
                        · {s.monthSessions} session
                        {s.monthSessions === 1 ? "" : "s"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {engagementIndicator(s.weekMinutes, s.currentStreak)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Helper callout */}
      <div className="mt-8 rounded-2xl border border-[#E8DFD3] bg-[#FAF6EF] p-6">
        <h3 className="font-semibold text-[#1A1A2E]">What you&apos;re seeing</h3>
        <ul className="mt-3 space-y-2 text-sm text-[#5A4E42]">
          <li>
            • <strong>Streak</strong> = consecutive days of practice, same
            calculation as your students see in the app.
          </li>
          <li>
            • <strong>This week / This month</strong> = rolling last 7 / 30
            days of practice time.
          </li>
          <li>
            • <strong>Status</strong> is a rough label based on streak and
            weekly minutes. Click a student for the full picture before you
            chase them up.
          </li>
          <li>
            • This is a demo dashboard. Per-teacher login, assignment
            creation, and messaging are coming in the next sprint.
          </li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtext,
  accent,
}: {
  label: string;
  value: string;
  subtext: string;
  accent?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E8DFD3] bg-white p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-[#6B7280]">
        {label}
      </p>
      <p
        className="mt-2 text-3xl font-bold"
        style={{ color: accent ?? "#1A1A2E" }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-[#6B7280]">{subtext}</p>
    </div>
  );
}
