import { describe, expect, it } from "vitest";
import { currentStreak, todayTotal, weeklyMinutes } from "../streak";

// All dates are LOCAL — mirroring iOS Calendar.current behaviour.
// "now" is Wednesday 2026-06-10 14:30 local.
const NOW = new Date(2026, 5, 10, 14, 30);

function session(date: Date, minutes = 30) {
  return { session_date: date.toISOString(), duration_minutes: minutes };
}

function daysAgo(days: number, hour = 10) {
  return new Date(2026, 5, 10 - days, hour);
}

describe("currentStreak — StreakCalculator.swift parity", () => {
  it("empty history → 0", () => {
    expect(currentStreak([], NOW)).toBe(0);
  });

  it("practised today only → 1", () => {
    expect(currentStreak([session(daysAgo(0))], NOW)).toBe(1);
  });

  it("practised yesterday only → 1 (until-midnight grace)", () => {
    expect(currentStreak([session(daysAgo(1))], NOW)).toBe(1);
  });

  it("gap of 2+ days → 0 (no grace beyond yesterday)", () => {
    expect(currentStreak([session(daysAgo(2))], NOW)).toBe(0);
    expect(currentStreak([session(daysAgo(5))], NOW)).toBe(0);
  });

  it("consecutive run ending today counts every day", () => {
    const sessions = [0, 1, 2, 3].map((d) => session(daysAgo(d)));
    expect(currentStreak(sessions, NOW)).toBe(4);
  });

  it("consecutive run ending yesterday still counts (not practised yet today)", () => {
    const sessions = [1, 2, 3].map((d) => session(daysAgo(d)));
    expect(currentStreak(sessions, NOW)).toBe(3);
  });

  it("a hole in the run stops the walk", () => {
    // today, yesterday, then a gap, then more days — streak is 2
    const sessions = [0, 1, 3, 4].map((d) => session(daysAgo(d)));
    expect(currentStreak(sessions, NOW)).toBe(2);
  });

  it("several sessions in one day count as one streak day", () => {
    const sessions = [
      session(daysAgo(0, 9)),
      session(daysAgo(0, 20)),
      session(daysAgo(1, 7)),
    ];
    expect(currentStreak(sessions, NOW)).toBe(2);
  });

  it("timezone edge: 23:55 yesterday + 00:05 today are two distinct local days", () => {
    const lateLast = new Date(2026, 5, 9, 23, 55);
    const earlyToday = new Date(2026, 5, 10, 0, 5);
    expect(currentStreak([session(lateLast), session(earlyToday)], NOW)).toBe(2);
  });

  it("a session just after local midnight counts as today, not yesterday", () => {
    const justAfterMidnight = new Date(2026, 5, 10, 0, 1);
    const checkEarly = new Date(2026, 5, 10, 0, 30);
    expect(currentStreak([session(justAfterMidnight)], checkEarly)).toBe(1);
  });
});

describe("todayTotal", () => {
  it("sums only today's local sessions", () => {
    const sessions = [
      session(daysAgo(0, 9), 20),
      session(daysAgo(0, 18), 15),
      session(daysAgo(1), 45),
    ];
    expect(todayTotal(sessions, NOW)).toBe(35);
  });

  it("is 0 with no sessions today", () => {
    expect(todayTotal([session(daysAgo(1), 45)], NOW)).toBe(0);
  });
});

describe("weeklyMinutes — Monday-start week (UK convention, iOS parity)", () => {
  it("counts sessions from Monday onwards", () => {
    // NOW is Wednesday 10 June 2026. Monday is 8 June.
    const sessions = [
      session(new Date(2026, 5, 8, 10), 30), // Monday — in
      session(new Date(2026, 5, 9, 10), 20), // Tuesday — in
      session(new Date(2026, 5, 10, 10), 10), // Wednesday — in
      session(new Date(2026, 5, 7, 10), 99), // Sunday — previous week, out
    ];
    expect(weeklyMinutes(sessions, NOW)).toBe(60);
  });

  it("on a Monday, only that day counts", () => {
    const monday = new Date(2026, 5, 8, 9, 0);
    const sessions = [
      session(new Date(2026, 5, 8, 8), 25),
      session(new Date(2026, 5, 7, 10), 50), // Sunday — out
    ];
    expect(weeklyMinutes(sessions, monday)).toBe(25);
  });

  it("a Sunday session counts towards the week that began the previous Monday", () => {
    const sunday = new Date(2026, 5, 14, 20, 0);
    const sessions = [session(new Date(2026, 5, 14, 9), 40)];
    expect(weeklyMinutes(sessions, sunday)).toBe(40);
  });
});
