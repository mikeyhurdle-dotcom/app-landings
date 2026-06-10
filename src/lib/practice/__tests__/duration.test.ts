import { describe, expect, it } from "vitest";
import { formatMinutes, formatShort, formatElapsed } from "../duration";

// Expected values mirror Shared/SharedUtilities/DurationFormatter.swift.
describe("formatMinutes", () => {
  it("renders minutes only under an hour", () => {
    expect(formatMinutes(0)).toBe("0m");
    expect(formatMinutes(1)).toBe("1m");
    expect(formatMinutes(45)).toBe("45m");
    expect(formatMinutes(59)).toBe("59m");
  });

  it("renders whole hours without minutes", () => {
    expect(formatMinutes(60)).toBe("1h");
    expect(formatMinutes(120)).toBe("2h");
  });

  it("renders mixed hours and minutes", () => {
    expect(formatMinutes(61)).toBe("1h 1m");
    expect(formatMinutes(90)).toBe("1h 30m");
    expect(formatMinutes(135)).toBe("2h 15m");
  });
});

describe("formatShort", () => {
  it("renders minutes under an hour", () => {
    expect(formatShort(0)).toBe("0m");
    expect(formatShort(59)).toBe("59m");
  });

  it("renders whole hours plainly", () => {
    expect(formatShort(60)).toBe("1h");
    expect(formatShort(180)).toBe("3h");
  });

  it("renders fractional hours to one decimal", () => {
    expect(formatShort(90)).toBe("1.5h");
    expect(formatShort(100)).toBe("1.7h");
  });
});

describe("formatElapsed", () => {
  it("renders m:ss under an hour", () => {
    expect(formatElapsed(0)).toBe("0:00");
    expect(formatElapsed(5)).toBe("0:05");
    expect(formatElapsed(65)).toBe("1:05");
    expect(formatElapsed(599)).toBe("9:59");
  });

  it("renders h:mm:ss from an hour up", () => {
    expect(formatElapsed(3600)).toBe("1:00:00");
    expect(formatElapsed(3661)).toBe("1:01:01");
  });

  it("never goes negative", () => {
    expect(formatElapsed(-10)).toBe("0:00");
  });
});
