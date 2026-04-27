export type TeacherAssetVars = {
  teacherName: string;
  teacherFullName: string;
  studioName: string;
  inviteCode: string;
  accentColor: string;
  studentName?: string;
};

export const DEFAULT_VARS: TeacherAssetVars = {
  teacherName: "your teacher",
  teacherFullName: "your teacher",
  studioName: "the studio",
  inviteCode: "INVITE-CODE",
  accentColor: "#2D8B7E",
};

export const PALETTE = {
  background: "#FFFBF7",
  surface: "#FFFFFF",
  border: "#E8DFD3",
  text: "#1A1A2E",
  textDim: "#5A4E42",
  textMuted: "#6B7280",
  panel: "#FAF6EF",
};

export function isLightColor(hex: string): boolean {
  const m = hex.replace("#", "");
  if (m.length !== 6) return false;
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
}
