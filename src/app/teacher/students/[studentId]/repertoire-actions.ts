"use server";

import { getActiveStudioName } from "@/lib/teacher-auth";
import {
  studentInStudio,
  updateRepertoirePiece,
  softDeleteRepertoirePiece,
  addRepertoirePiece,
} from "@/lib/teacher-queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const VALID_STATUSES = ["learning", "polishing", "mastered", "archived"] as const;
type ValidStatus = (typeof VALID_STATUSES)[number];

function isValidStatus(s: string): s is ValidStatus {
  return (VALID_STATUSES as readonly string[]).includes(s);
}

function requireStudio(studioName: string | null): string {
  if (!studioName) {
    redirect("/teacher/login");
  }
  return studioName;
}

/**
 * Update editable fields on an existing repertoire piece.
 * Reads: pieceId, studentId, title, artist, status, targetBpm,
 * targetCompletionDate, instrumentType.
 *
 * C1: verifies the student belongs to the active studio before writing.
 * I2: rejects status values not in the allowed set.
 */
export async function updateRepertoirePieceAction(
  formData: FormData,
): Promise<void> {
  const studioName = requireStudio(await getActiveStudioName());
  const pieceId = (formData.get("pieceId") as string | null)?.trim() ?? "";
  const studentId = (formData.get("studentId") as string | null)?.trim() ?? "";
  if (!pieceId || !studentId) return;

  // C1 — studio scope guard
  const inStudio = await studentInStudio(studentId, studioName);
  if (!inStudio) {
    redirect(
      `/teacher/students/${studentId}?repertoire_error=${encodeURIComponent("Access denied: student not in your studio")}`,
    );
  }

  const title = (formData.get("title") as string | null)?.trim();
  const artist =
    ((formData.get("artist") as string | null)?.trim() ?? "") || null;
  const rawStatus = (formData.get("status") as string | null)?.trim();
  // I2 — only pass status if it's in the allowed set
  const status = rawStatus && isValidStatus(rawStatus) ? rawStatus : undefined;
  const targetBpmRaw = (formData.get("targetBpm") as string | null)?.trim();
  const targetBpm =
    targetBpmRaw && targetBpmRaw !== "" ? parseInt(targetBpmRaw, 10) : null;
  const targetCompletionDateRaw = (
    formData.get("targetCompletionDate") as string | null
  )?.trim();
  const targetCompletionDate =
    targetCompletionDateRaw && targetCompletionDateRaw !== ""
      ? targetCompletionDateRaw
      : null;
  const instrumentType = (
    formData.get("instrumentType") as string | null
  )?.trim();

  const result = await updateRepertoirePiece({
    id: pieceId,
    studentUserId: studentId,
    studioName,
    ...(title !== undefined && { title }),
    artist,
    ...(status !== undefined && { status }),
    targetBpm,
    targetCompletionDate,
    ...(instrumentType !== undefined && { instrumentType }),
  });

  if (!result.ok) {
    redirect(
      `/teacher/students/${studentId}?repertoire_error=${encodeURIComponent(result.error)}`,
    );
  }

  revalidatePath(`/teacher/students/${studentId}`);
}

/**
 * Soft-delete a repertoire piece (sets deleted_at to now).
 * Reads: pieceId, studentId.
 *
 * C1: verifies the student belongs to the active studio before writing.
 */
export async function deleteRepertoirePieceAction(
  formData: FormData,
): Promise<void> {
  const studioName = requireStudio(await getActiveStudioName());
  const pieceId = (formData.get("pieceId") as string | null)?.trim() ?? "";
  const studentId = (formData.get("studentId") as string | null)?.trim() ?? "";
  if (!pieceId || !studentId) return;

  // C1 — studio scope guard
  const inStudio = await studentInStudio(studentId, studioName);
  if (!inStudio) {
    redirect(
      `/teacher/students/${studentId}?repertoire_error=${encodeURIComponent("Access denied: student not in your studio")}`,
    );
  }

  const result = await softDeleteRepertoirePiece(pieceId, studentId);

  if (!result.ok) {
    redirect(
      `/teacher/students/${studentId}?repertoire_error=${encodeURIComponent(result.error)}`,
    );
  }

  revalidatePath(`/teacher/students/${studentId}`);
}

/**
 * Add a new repertoire piece for a student.
 * Reads: studentId (user_id), title, artist, status, instrumentType,
 * targetBpm, targetCompletionDate.
 *
 * C1: verifies the student belongs to the active studio before writing.
 * I2: falls back to "learning" if submitted status is not in the allowed set.
 */
export async function addRepertoirePieceAction(
  formData: FormData,
): Promise<void> {
  const studioName = requireStudio(await getActiveStudioName());
  const studentId = (formData.get("studentId") as string | null)?.trim() ?? "";
  const title = (formData.get("title") as string | null)?.trim() ?? "";
  if (!studentId || !title) return;

  // C1 — studio scope guard
  const inStudio = await studentInStudio(studentId, studioName);
  if (!inStudio) {
    redirect(
      `/teacher/students/${studentId}?repertoire_error=${encodeURIComponent("Access denied: student not in your studio")}`,
    );
  }

  const artist =
    ((formData.get("artist") as string | null)?.trim() ?? "") || null;
  const rawStatus =
    ((formData.get("status") as string | null)?.trim() ?? "") || "learning";
  // I2 — validate status; default to "learning" if invalid
  const status: ValidStatus = isValidStatus(rawStatus) ? rawStatus : "learning";
  const instrumentType =
    ((formData.get("instrumentType") as string | null)?.trim() ?? "") ||
    "piano";
  const targetBpmRaw = (formData.get("targetBpm") as string | null)?.trim();
  const targetBpm =
    targetBpmRaw && targetBpmRaw !== "" ? parseInt(targetBpmRaw, 10) : null;
  const targetCompletionDateRaw = (
    formData.get("targetCompletionDate") as string | null
  )?.trim();
  const targetCompletionDate =
    targetCompletionDateRaw && targetCompletionDateRaw !== ""
      ? targetCompletionDateRaw
      : null;

  const result = await addRepertoirePiece({
    studentUserId: studentId,
    title,
    artist,
    status,
    instrumentType,
    targetBpm,
    targetCompletionDate,
  });

  if (!result.ok) {
    redirect(
      `/teacher/students/${studentId}?repertoire_error=${encodeURIComponent(result.error)}`,
    );
  }

  revalidatePath(`/teacher/students/${studentId}`);
}
