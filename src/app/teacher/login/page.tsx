import { verifyPasswordAndLogin, isTeacherLoggedIn } from "@/lib/teacher-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign in · Mewstro Teacher",
  robots: { index: false, follow: false },
};

async function loginAction(formData: FormData) {
  "use server";
  const password = (formData.get("password") as string | null)?.trim() ?? "";
  const ok = await verifyPasswordAndLogin(password);
  if (ok) {
    redirect("/teacher");
  }
  redirect("/teacher/login?error=1");
}

export default async function TeacherLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // If already logged in, bounce straight to the dashboard
  if (await isTeacherLoggedIn()) {
    redirect("/teacher");
  }

  const params = await searchParams;
  const showError = params.error === "1";

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-[#E8DFD3] bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold">Teacher dashboard</h1>
          <p className="mt-2 text-sm text-[#6B7280]">
            Enter the password I sent you. One per teacher, demo only.
          </p>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1A1A2E]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="mt-1 block w-full rounded-lg border border-[#E8DFD3] bg-[#FFFBF7] px-3 py-2 text-base focus:border-[#2D8B7E] focus:outline-none focus:ring-2 focus:ring-[#2D8B7E]/20"
            />
          </div>

          {showError && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              That password didn&apos;t match. Try again or message me.
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#2D8B7E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#246F64] transition-colors"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#6B7280]">
          Real per-teacher auth (Supabase magic link) is coming after
          launch. This password gate is a shortcut for the pilot.
        </p>
      </div>
    </div>
  );
}
