/**
 * Instrument + task-type definitions, mirrored from the iOS app so data
 * stays consistent across platforms:
 * - keys: `InstrumentType` raw values (Mewstro/Models/Instrument.swift) —
 *   what `mewstro_practice_sessions.instrument_type` stores
 * - task names: TaskTypePicker.swift options — what `task_type` stores
 *   (display strings, e.g. "Sight Reading")
 */

export const INSTRUMENTS = [
  { key: "piano", name: "Piano" },
  { key: "guitar", name: "Guitar" },
  { key: "violin", name: "Violin" },
  { key: "drums", name: "Drums" },
  { key: "voice", name: "Voice" },
  { key: "flute", name: "Flute" },
  { key: "saxophone", name: "Saxophone" },
  { key: "trumpet", name: "Trumpet" },
  { key: "cello", name: "Cello" },
  { key: "bass", name: "Bass" },
  { key: "ukulele", name: "Ukulele" },
  { key: "other", name: "Other" },
] as const;

export type InstrumentKey = (typeof INSTRUMENTS)[number]["key"];

export function instrumentName(key: string): string {
  return INSTRUMENTS.find((i) => i.key === key)?.name ?? "Other";
}

const DEFAULT_TASK_TYPES = [
  "Repertoire",
  "Scales",
  "Technique",
  "Theory",
  "Improvisation",
  "Play for Fun",
];

/** Per-instrument task options — verbatim from iOS TaskTypePicker.swift. */
export function taskTypesFor(instrument: string): string[] {
  switch (instrument) {
    case "piano":
      return [
        "Repertoire",
        "Sight Reading",
        "Scales",
        "Technique",
        "Theory",
        "Play for Fun",
      ];
    case "guitar":
      return [
        "Repertoire",
        "Scales",
        "Technique",
        "Improvisation",
        "Theory",
        "Play for Fun",
      ];
    case "voice":
      return [
        "Repertoire",
        "Warm Up",
        "Technique",
        "Ear Training",
        "Recording",
        "Play for Fun",
      ];
    default:
      return DEFAULT_TASK_TYPES;
  }
}
