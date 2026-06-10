import { describe, expect, it } from "vitest";
import {
  elapsedMs,
  startTimer,
  pauseTimer,
  resumeTimer,
  finishedMinutes,
} from "../timer";

const T0 = 1_750_000_000_000;
const MIN = 60_000;

describe("wall-clock timer", () => {
  it("derives elapsed from timestamps, not ticks", () => {
    const t = startTimer("piano", "Scales", T0);
    // 25 minutes pass with zero ticks (tab backgrounded / screen locked).
    expect(elapsedMs(t, T0 + 25 * MIN)).toBe(25 * MIN);
  });

  it("banks elapsed time across pause / resume", () => {
    let t = startTimer("piano", "Scales", T0);
    t = pauseTimer(t, T0 + 10 * MIN); // practised 10
    expect(elapsedMs(t, T0 + 60 * MIN)).toBe(10 * MIN); // paused 50 — no drift
    t = resumeTimer(t, T0 + 60 * MIN);
    expect(elapsedMs(t, T0 + 75 * MIN)).toBe(25 * MIN); // +15 after resume
  });

  it("pause and resume are idempotent", () => {
    let t = startTimer("piano", "Scales", T0);
    t = pauseTimer(t, T0 + MIN);
    expect(pauseTimer(t, T0 + 2 * MIN)).toEqual(t);
    t = resumeTimer(t, T0 + 3 * MIN);
    expect(resumeTimer(t, T0 + 4 * MIN)).toEqual(t);
  });

  it("rounds finished sessions down, minimum 1 minute (iOS parity)", () => {
    const t = startTimer("piano", "Scales", T0);
    expect(finishedMinutes(t, T0 + 10_000)).toBe(1); // 10s → 1m
    expect(finishedMinutes(t, T0 + 25 * MIN + 59_000)).toBe(25);
  });
});
