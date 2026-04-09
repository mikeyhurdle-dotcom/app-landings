import { getServerSupabase } from "./supabase";

/**
 * Typed read helpers for the teacher dashboard. Every function here pulls
 * from the shared HobbyPulse Supabase project (mewstro_ prefix) and
 * filters to a single studio.
 *
 * For v1 demo the studio is hardcoded to Ellie's. Once per-teacher auth
 * lands, we'll swap the hardcoded studio name for a lookup based on the
 * logged-in teacher.
 */

export const ELLIE_STUDIO_NAME = "Ellie Moorhouse's Studio";

export interface StudentRow {
  userId: string;
  displayName: string;
  memberSince: string | null; // membership created_at — absent if we can't resolve
}

export interface StudentSummary extends StudentRow {
  /** Minutes practised in the last 7 days */
  weekMinutes: number;
  /** Minutes practised in the last 30 days */
  monthMinutes: number;
  /** Count of sessions in the last 30 days */
  monthSessions: number;
  /** Current streak of consecutive practice days ending today (or yesterday) */
  currentStreak: number;
  /** ISO timestamp of the most recent session, or null if never */
  lastPracticeAt: string | null;
  /** Distinct instruments played in the last 30 days */
  instruments: string[];
  /** Count of repertoire pieces (all time) */
  repertoireCount: number;
  /** Count of milestone recordings (all time) */
  milestoneCount: number;
}

export interface StudioOverview {
  studioName: string;
  teacherName: string;
  inviteCode: string;
  students: StudentSummary[];
  /** Aggregate minutes across all students this week */
  totalWeekMinutes: number;
  /** Count of active students (at least 1 session in last 7 days) */
  activeThisWeek: number;
  /** Count of students with any session ever */
  totalStudents: number;
}

export interface SessionRow {
  id: string;
  sessionDate: string;
  durationMinutes: number;
  taskType: string;
  instrumentType: string;
  focusLevel: number | null;
  mood: string | null;
  notes: string | null;
  repertoireId: string | null;
}

export interface RepertoireRow {
  id: string;
  title: string;
  artist: string | null;
  status: string;
  totalPracticeMinutes: number;
  instrumentType: string;
  targetBpm: number | null;
  currentBpm: number | null;
}

export interface MilestoneRow {
  id: string;
  repertoireId: string;
  milestoneType: string;
  previousValue: string | null;
  newValue: string | null;
  createdAt: string;
  durationSeconds: number;
}

export interface StudentDetail extends StudentSummary {
  studioName: string;
  recentSessions: SessionRow[];
  repertoire: RepertoireRow[];
  milestones: MilestoneRow[];
  /** Map of YYYY-MM-DD → total minutes for the last 90 days */
  heatmap: Record<string, number>;
}

/**
 * Day-local streak count. Mirrors the logic in the iOS `StreakCalculator`
 * (rewritten in Stage 1 — uses Set<Date> with startOfDay bucketing) so web
 * and iOS show the same number.
 */
function calcStreak(sessionDates: Date[]): number {
  if (sessionDates.length === 0) return 0;

  const bucket = new Set<string>();
  for (const d of sessionDates) {
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    bucket.add(key);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const key = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

  let cursor: Date;
  if (bucket.has(key(today))) {
    cursor = new Date(today);
  } else {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (bucket.has(key(yesterday))) {
      cursor = yesterday;
    } else {
      return 0;
    }
  }

  let streak = 0;
  while (bucket.has(key(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/**
 * Pull the full studio overview: teacher metadata + every student + their
 * aggregate practice stats for the student list view.
 */
export async function getStudioOverview(
  studioName: string = ELLIE_STUDIO_NAME,
): Promise<StudioOverview> {
  const supabase = getServerSupabase();

  // 1. Studio metadata
  const { data: studio, error: studioErr } = await supabase
    .from("mewstro_studios")
    .select("teacher_name, studio_name, invite_code")
    .eq("studio_name", studioName)
    .single();

  if (studioErr || !studio) {
    throw new Error(
      `Studio lookup failed: ${studioErr?.message ?? "not found"}`,
    );
  }

  // 2. Memberships for this studio
  const { data: memberships, error: memErr } = await supabase
    .from("mewstro_leaderboard_memberships")
    .select("user_id, display_name_override, opted_in")
    .eq("studio_name", studioName)
    .eq("opted_in", true);

  if (memErr || !memberships) {
    throw new Error(
      `Membership fetch failed: ${memErr?.message ?? "empty"}`,
    );
  }

  const userIds = memberships.map((m) => m.user_id);
  if (userIds.length === 0) {
    return {
      studioName: studio.studio_name,
      teacherName: studio.teacher_name,
      inviteCode: studio.invite_code,
      students: [],
      totalWeekMinutes: 0,
      activeThisWeek: 0,
      totalStudents: 0,
    };
  }

  // 3. Last 30 days of sessions for every student in one query
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: sessions, error: sessErr } = await supabase
    .from("mewstro_practice_sessions")
    .select("user_id, session_date, duration_minutes, instrument_type")
    .in("user_id", userIds)
    .gte("session_date", thirtyDaysAgo.toISOString());

  if (sessErr) {
    throw new Error(`Sessions fetch failed: ${sessErr.message}`);
  }

  // 4. Repertoire + milestone counts per user (all time)
  const [{ data: repertoire }, { data: milestones }] = await Promise.all([
    supabase
      .from("mewstro_repertoire")
      .select("user_id")
      .in("user_id", userIds),
    supabase
      .from("mewstro_milestone_recordings")
      .select("user_id")
      .in("user_id", userIds),
  ]);

  // Aggregate per student
  const weekCutoff = new Date();
  weekCutoff.setDate(weekCutoff.getDate() - 7);

  const students: StudentSummary[] = memberships.map((m) => {
    const userSessions = (sessions ?? []).filter(
      (s) => s.user_id === m.user_id,
    );

    const weekSessions = userSessions.filter(
      (s) => new Date(s.session_date) >= weekCutoff,
    );

    const weekMinutes = weekSessions.reduce(
      (sum, s) => sum + s.duration_minutes,
      0,
    );
    const monthMinutes = userSessions.reduce(
      (sum, s) => sum + s.duration_minutes,
      0,
    );
    const lastSession = userSessions
      .map((s) => s.session_date)
      .sort()
      .reverse()[0];

    const instruments = Array.from(
      new Set(userSessions.map((s) => s.instrument_type)),
    );

    const sessionDates = userSessions.map((s) => new Date(s.session_date));
    const streak = calcStreak(sessionDates);

    const rCount = (repertoire ?? []).filter(
      (r) => r.user_id === m.user_id,
    ).length;
    const mCount = (milestones ?? []).filter(
      (x) => x.user_id === m.user_id,
    ).length;

    return {
      userId: m.user_id,
      displayName: m.display_name_override ?? "Student",
      memberSince: null,
      weekMinutes,
      monthMinutes,
      monthSessions: userSessions.length,
      currentStreak: streak,
      lastPracticeAt: lastSession ?? null,
      instruments,
      repertoireCount: rCount,
      milestoneCount: mCount,
    };
  });

  // Sort by weekMinutes desc (leaderboard order)
  students.sort((a, b) => b.weekMinutes - a.weekMinutes);

  const totalWeekMinutes = students.reduce((s, x) => s + x.weekMinutes, 0);
  const activeThisWeek = students.filter((s) => s.weekMinutes > 0).length;

  return {
    studioName: studio.studio_name,
    teacherName: studio.teacher_name,
    inviteCode: studio.invite_code,
    students,
    totalWeekMinutes,
    activeThisWeek,
    totalStudents: students.length,
  };
}

/**
 * Full detail for a single student: sessions, repertoire, milestones, and
 * a 90-day heatmap.
 */
export async function getStudentDetail(
  userId: string,
  studioName: string = ELLIE_STUDIO_NAME,
): Promise<StudentDetail | null> {
  const supabase = getServerSupabase();

  // Confirm the student belongs to this studio
  const { data: membership, error: memErr } = await supabase
    .from("mewstro_leaderboard_memberships")
    .select("user_id, display_name_override, studio_name")
    .eq("user_id", userId)
    .eq("studio_name", studioName)
    .single();

  if (memErr || !membership) return null;

  // 90 days of sessions, all repertoire, all milestones, in parallel
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

  const [sessionsRes, repertoireRes, milestonesRes] = await Promise.all([
    supabase
      .from("mewstro_practice_sessions")
      .select(
        "id, session_date, duration_minutes, task_type, instrument_type, focus_level, mood, notes, repertoire_id",
      )
      .eq("user_id", userId)
      .gte("session_date", ninetyDaysAgo.toISOString())
      .order("session_date", { ascending: false }),
    supabase
      .from("mewstro_repertoire")
      .select(
        "id, title, artist, status, total_practice_minutes, instrument_type, target_bpm, current_bpm",
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
    supabase
      .from("mewstro_milestone_recordings")
      .select(
        "id, repertoire_id, milestone_type, previous_value, new_value, created_at, duration_seconds",
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
  ]);

  const sessions = sessionsRes.data ?? [];
  const repertoire = repertoireRes.data ?? [];
  const milestones = milestonesRes.data ?? [];

  // Build 90-day heatmap: YYYY-MM-DD → minutes
  const heatmap: Record<string, number> = {};
  for (const s of sessions) {
    const d = new Date(s.session_date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    heatmap[key] = (heatmap[key] ?? 0) + s.duration_minutes;
  }

  // Reuse the overview aggregator logic by constructing a single-student
  // summary from the fetched data. Keeps the math consistent.
  const weekCutoff = new Date();
  weekCutoff.setDate(weekCutoff.getDate() - 7);
  const thirtyCutoff = new Date();
  thirtyCutoff.setDate(thirtyCutoff.getDate() - 30);

  const last30 = sessions.filter(
    (s) => new Date(s.session_date) >= thirtyCutoff,
  );
  const last7 = last30.filter(
    (s) => new Date(s.session_date) >= weekCutoff,
  );

  const weekMinutes = last7.reduce((sum, s) => sum + s.duration_minutes, 0);
  const monthMinutes = last30.reduce((sum, s) => sum + s.duration_minutes, 0);
  const streak = calcStreak(sessions.map((s) => new Date(s.session_date)));
  const instruments = Array.from(
    new Set(last30.map((s) => s.instrument_type)),
  );

  return {
    userId,
    displayName: membership.display_name_override ?? "Student",
    memberSince: null,
    studioName: membership.studio_name,
    weekMinutes,
    monthMinutes,
    monthSessions: last30.length,
    currentStreak: streak,
    lastPracticeAt: sessions[0]?.session_date ?? null,
    instruments,
    repertoireCount: repertoire.length,
    milestoneCount: milestones.length,
    recentSessions: sessions.slice(0, 30).map((s) => ({
      id: s.id,
      sessionDate: s.session_date,
      durationMinutes: s.duration_minutes,
      taskType: s.task_type,
      instrumentType: s.instrument_type,
      focusLevel: s.focus_level,
      mood: s.mood,
      notes: s.notes,
      repertoireId: s.repertoire_id,
    })),
    repertoire: repertoire.map((r) => ({
      id: r.id,
      title: r.title,
      artist: r.artist,
      status: r.status,
      totalPracticeMinutes: r.total_practice_minutes,
      instrumentType: r.instrument_type,
      targetBpm: r.target_bpm,
      currentBpm: r.current_bpm,
    })),
    milestones: milestones.map((m) => ({
      id: m.id,
      repertoireId: m.repertoire_id,
      milestoneType: m.milestone_type,
      previousValue: m.previous_value,
      newValue: m.new_value,
      createdAt: m.created_at,
      durationSeconds: m.duration_seconds,
    })),
    heatmap,
  };
}
