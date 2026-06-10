import { describe, expect, it } from "vitest";
import { minutesByPiece } from "../repertoire";

// Mirrors iOS RepertoireDetailView: per-piece time is the sum of linked
// sessions' durations — the stored total_practice_minutes column is never
// trusted, so web and iOS can't diverge.
describe("minutesByPiece", () => {
  it("sums durations per repertoire_id", () => {
    const totals = minutesByPiece([
      { repertoire_id: "a", duration_minutes: 20 },
      { repertoire_id: "a", duration_minutes: 15 },
      { repertoire_id: "b", duration_minutes: 5 },
    ]);
    expect(totals.get("a")).toBe(35);
    expect(totals.get("b")).toBe(5);
  });

  it("ignores sessions not linked to a piece", () => {
    const totals = minutesByPiece([
      { repertoire_id: null, duration_minutes: 45 },
      { repertoire_id: "a", duration_minutes: 10 },
    ]);
    expect(totals.get("a")).toBe(10);
    expect(totals.size).toBe(1);
  });

  it("returns an empty map for no sessions", () => {
    expect(minutesByPiece([]).size).toBe(0);
  });

  it("a piece with no sessions simply has no entry (renders as 0m)", () => {
    const totals = minutesByPiece([
      { repertoire_id: "other", duration_minutes: 30 },
    ]);
    expect(totals.get("unpractised") ?? 0).toBe(0);
  });
});
