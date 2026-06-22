"use server";

import { getActiveStudioName } from "@/lib/teacher-auth";
import {
  updateRepertoirePiece,
  softDeleteRepertoirePiece,
  addRepertoirePiece,
} from "@/lib/teacher-queries";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function requireStudio(studioName: string | null): string {
  if (!studioName) {
    redirect("/teacher/login");
  }
  return studioName;
}

/**
 * Update editable fields on an existing repertoire piece.
 * Reads: pieceId, title, artist, status, targetBpm, targetCompletionDate,
 * instrumentType, studentId (for revalidating the student page path).
 */
export async function updateRepertoirePieceAction(
  formData: FormData,
): Promise<void> {
  const studioName = requireStudio(await getActiveStudioName());
  const pieceId = (formData.get("pieceId") as string | null)?.trim() ?? "";
  const studentId = (formData.get("studentId") as string | null)?.trim() ?? "";
  if (!pieceId || !studentId) return;

  const title = (formData.get("title") as string | null)?.trim();
  const artist =
    ((formData.get("artist") as string | null)?.trim() ?? "") || null;
  const status = (formData.get("status") as string | null)?.trim();
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
    studioName,
    ...(title !== undefined && { title }),
    artist,
    ...(status !== undefined && { status }),
    targetBpm,
    targetCompletionDate,
    ...(instrumentType !== undefined && { instrumentType }),
  });

  if (!result.ok) {
    // Redirect back with an error param rather than throwing so the page
    // still loads.
    redirect(
      `/teacher/students/${studentId}?repertoire_error=${encodeURIComponent(result.error)}`,
    );
  }

  revalidatePath(`/teacher/students/${studentId}`);
}

/**
 * Soft-delete a repertoire piece (sets deleted_at to now).
 * Reads: pieceId, studentId.
 */
export async function deleteRepertoirePieceAction(
  formData: FormData,
): Promise<void> {
  requireStudio(await getActiveStudioName());
  const pieceId = (formData.get("pieceId") as string | null)?.trim() ?? "";
  const studentId = (formData.get("studentId") as string | null)?.trim() ?? "";
  if (!pieceId || !studentId) return;

  const result = await softDeleteRepertoirePiece(pieceId);

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
 */
export async function addRepertoirePieceAction(
  formData: FormData,
): Promise<void> {
  requireStudio(await getActiveStudioName());
  const studentId = (formData.get("studentId") as string | null)?.trim() ?? "";
  const title = (formData.get("title") as string | null)?.trim() ?? "";
  if (!studentId || !title) return;

  const artist =
    ((formData.get("artist") as string | null)?.trim() ?? "") || null;
  const status =
    ((formData.get("status") as string | null)?.trim() ?? "") || "learning";
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
