import { beforeEach, describe, expect, it } from "vitest";
import {
  PENDING_SESSIONS_KEY,
  type PracticeSessionRow,
  buildSession,
  flushPendingSessions,
  queuePendingSession,
  readPendingSessions,
} from "../sessions";

function makeStore() {
  const map = new Map<string, string>();
  return {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
    _map: map,
  };
}

function row(id: string): PracticeSessionRow {
  return {
    id,
    user_id: "user-1",
    session_date: "2026-06-10T12:00:00.000Z",
    duration_minutes: 30,
    task_type: "Repertoire",
    instrument_type: "piano",
    notes: null,
    repertoire_id: null,
    created_at: "2026-06-10T12:30:00.000Z",
  };
}

describe("buildSession", () => {
  it("matches the iOS column shape exactly", () => {
    const built = buildSession({
      userId: "user-1",
      sessionDate: new Date("2026-06-10T09:00:00Z"),
      durationMinutes: 25,
      taskType: "Scales",
      instrumentType: "piano",
      notes: "  hands together  ",
    });

    // Keys must stay in lock-step with SyncService.pushSession /
    // PracticeSessionDTO so iOS pull-sync ingests web rows.
    expect(Object.keys(built).sort()).toEqual([
      "created_at",
      "duration_minutes",
      "id",
      "instrument_type",
      "notes",
      "repertoire_id",
      "session_date",
      "task_type",
      "user_id",
    ]);
    expect(built.session_date).toBe("2026-06-10T09:00:00.000Z");
    expect(built.notes).toBe("hands together");
    expect(built.repertoire_id).toBeNull();
    expect(built.id).toMatch(/^[0-9a-f-]{36}$/);
  });

  it("carries the piece id when practising repertoire", () => {
    const built = buildSession({
      userId: "user-1",
      sessionDate: new Date(),
      durationMinutes: 25,
      taskType: "Repertoire",
      instrumentType: "piano",
      repertoireId: "piece-1",
    });
    expect(built.repertoire_id).toBe("piece-1");
  });

  it("stores empty notes as null", () => {
    const built = buildSession({
      userId: "user-1",
      sessionDate: new Date(),
      durationMinutes: 10,
      taskType: "Theory",
      instrumentType: "guitar",
      notes: "   ",
    });
    expect(built.notes).toBeNull();
  });
});

describe("pending queue", () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
  });

  it("queues and reads back sessions", () => {
    queuePendingSession(store, row("a"));
    queuePendingSession(store, row("b"));
    expect(readPendingSessions(store).map((r) => r.id)).toEqual(["a", "b"]);
  });

  it("never duplicates the same session id", () => {
    queuePendingSession(store, row("a"));
    queuePendingSession(store, row("a"));
    expect(readPendingSessions(store)).toHaveLength(1);
  });

  it("survives corrupted storage", () => {
    store.setItem(PENDING_SESSIONS_KEY, "not json{");
    expect(readPendingSessions(store)).toEqual([]);
  });

  it("flush saves everything and clears the key", async () => {
    queuePendingSession(store, row("a"));
    queuePendingSession(store, row("b"));

    const inserted: string[] = [];
    const saved = await flushPendingSessions(store, async (r) => {
      inserted.push(r.id);
    });

    expect(saved).toBe(2);
    expect(inserted).toEqual(["a", "b"]);
    expect(store.getItem(PENDING_SESSIONS_KEY)).toBeNull();
  });

  it("flush keeps only the sessions that still fail", async () => {
    queuePendingSession(store, row("ok"));
    queuePendingSession(store, row("bad"));

    const saved = await flushPendingSessions(store, async (r) => {
      if (r.id === "bad") throw new Error("offline");
    });

    expect(saved).toBe(1);
    expect(readPendingSessions(store).map((r) => r.id)).toEqual(["bad"]);
  });

  it("flush on an empty queue is a no-op", async () => {
    const saved = await flushPendingSessions(store, async () => {
      throw new Error("should not be called");
    });
    expect(saved).toBe(0);
  });
});
