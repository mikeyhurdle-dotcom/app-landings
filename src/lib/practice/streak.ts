/**
 * Faithful port of Mewstro/Services/StreakCalculator.swift.
 *
 * Sessions are bucketed by LOCAL-day midnight (the user's timezone, like
 * iOS's Calendar.current) so web and iOS always show the same number for
 * the same account. Must run where the user's timezone applies — i.e. in
 * the browser, not on a UTC server.
 */

export type SessionLike = {
  session_date: string;
  duration_minutes: number;
};

/** Epoch ms of the local-day midnight containing `d`. */
function dayKey(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

/** Local midnight `offset` days before/after the day containing `d`. */
function shiftDay(d: Date, offset: number): Date {
  // Date constructor normalises out-of-range days, handling month ends
  // and DST transitions the same way Calendar.date(byAdding:) does.
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + offset);
}

/**
 * Consecutive practice days ending today — or yesterday, if today hasn't
 * been practised yet (the "you still have until midnight" model).
 */
export function currentStreak(
  sessions: SessionLike[],
  now: Date = new Date(),
): number {
  const practiceDays = new Set(
    sessions.map((s) => dayKey(new Date(s.session_date))),
  );
  if (practiceDays.size === 0) return 0;

  const today = shiftDay(now, 0);
  let checkDate: Date;

  if (practiceDays.has(today.getTime())) {
    checkDate = today;
  } else {
    const yesterday = shiftDay(now, -1);
    if (!practiceDays.has(yesterday.getTime())) return 0;
    checkDate = yesterday;
  }

  let streak = 0;
  while (practiceDays.has(checkDate.getTime())) {
    streak += 1;
    checkDate = shiftDay(checkDate, -1);
  }
  return streak;
}

/** Minutes practised today (local day) — StreakCalculator.todayTotal. */
export function todayTotal(
  sessions: SessionLike[],
  now: Date = new Date(),
): number {
  const today = dayKey(now);
  return sessions
    .filter((s) => dayKey(new Date(s.session_date)) === today)
    .reduce((sum, s) => sum + s.duration_minutes, 0);
}

/**
 * Minutes practised in the current week. iOS uses
 * `calendar.dateInterval(of: .weekOfYear, for: .now)` with the device
 * locale — Monday-start in the UK, where Mewstro's studios are. We pin
 * Monday so web and iOS agree for UK accounts.
 */
export function weeklyMinutes(
  sessions: SessionLike[],
  now: Date = new Date(),
): number {
  const daysSinceMonday = (now.getDay() + 6) % 7;
  const weekStart = shiftDay(now, -daysSinceMonday).getTime();
  const weekEnd = shiftDay(now, 7 - daysSinceMonday).getTime();

  return sessions
    .filter((s) => {
      const t = new Date(s.session_date).getTime();
      return t >= weekStart && t < weekEnd;
    })
    .reduce((sum, s) => sum + s.duration_minutes, 0);
}
