"use server";

import { createAssignment, ELLIE_STUDIO_NAME } from "@/lib/teacher-queries";
import { redirect } from "next/navigation";

/**
 * Server action for the new-assignment form. Validates inputs, writes
 * the three rows (assignment + targets + zero completions) via the
 * shared `createAssignment` helper, then redirects back to the list.
 *
 * File-level `"use server"` directive — see /teacher/login/actions.ts
 * for the rationale (inline module-level actions don't wire up in
 * Next 16).
 */
export async function createAssignmentAction(
  formData: FormData,
): Promise<void> {
  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const description =
    ((formData.get("description") as string | null)?.trim() ?? "") || null;
  const dueDateRaw = (formData.get("dueDate") as string | null)?.trim() ?? "";
  const dueDate = dueDateRaw || null;

  // Student ids come in as multiple values named "studentIds"
  const studentIds = formData.getAll("studentIds").map(String).filter(Boolean);

  if (!title) {
    redirect("/teacher/assignments/new?error=title");
  }

  if (studentIds.length === 0) {
    redirect("/teacher/assignments/new?error=students");
  }

  const result = await createAssignment({
    studioName: ELLIE_STUDIO_NAME,
    title,
    description,
    dueDate,
    studentUserIds: studentIds,
  });

  if (!result.ok) {
    redirect("/teacher/assignments/new?error=server");
  }

  redirect("/teacher/assignments?created=1");
}
