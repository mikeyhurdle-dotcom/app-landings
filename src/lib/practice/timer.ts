/**
 * Wall-clock timer state. Elapsed time is always derived from epoch
 * timestamps — never from accumulated setInterval ticks — so locking the
 * phone or backgrounding the tab for any length of time can't drift it.
 * Persisted to localStorage so a reload doesn't lose a running session.
 */

export type TimerState = {
  /** Epoch ms of the current run segment; null while paused. */
  startedAt: number | null;
  /** Elapsed ms banked from segments before the last pause. */
  accumulatedMs: number;
  instrument: string;
  taskType: string;
};

export const ACTIVE_TIMER_KEY = "mewstro-active-timer";

export function elapsedMs(state: TimerState, now: number): number {
  const running = state.startedAt !== null ? now - state.startedAt : 0;
  return state.accumulatedMs + Math.max(0, running);
}

export function startTimer(
  instrument: string,
  taskType: string,
  now: number,
): TimerState {
  return { startedAt: now, accumulatedMs: 0, instrument, taskType };
}

export function pauseTimer(state: TimerState, now: number): TimerState {
  if (state.startedAt === null) return state;
  return { ...state, startedAt: null, accumulatedMs: elapsedMs(state, now) };
}

export function resumeTimer(state: TimerState, now: number): TimerState {
  if (state.startedAt !== null) return state;
  return { ...state, startedAt: now };
}

/** Minutes for the saved session — minimum 1, matching iOS. */
export function finishedMinutes(state: TimerState, now: number): number {
  return Math.max(1, Math.floor(elapsedMs(state, now) / 60_000));
}

export function loadTimer(store: Pick<Storage, "getItem">): TimerState | null {
  try {
    const raw = store.getItem(ACTIVE_TIMER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.accumulatedMs !== "number") return null;
    return parsed as TimerState;
  } catch {
    return null;
  }
}

export function persistTimer(
  store: Pick<Storage, "setItem" | "removeItem">,
  state: TimerState | null,
): void {
  if (state === null) {
    store.removeItem(ACTIVE_TIMER_KEY);
  } else {
    store.setItem(ACTIVE_TIMER_KEY, JSON.stringify(state));
  }
}
