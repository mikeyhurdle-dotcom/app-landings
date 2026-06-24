import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/server";
import { fetchMembership } from "@/lib/practice/studio";
import { getMyResources } from "@/lib/practice/resources";
import { MaterialsList } from "@/components/practice/MaterialsList";

export const metadata: Metadata = { title: "Materials" };

export default async function MaterialsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/practice/sign-in");

  const membership = await fetchMembership(supabase, user.id).catch(() => null);

  if (!membership) {
    return (
      <main className="flex flex-col items-center px-6 pt-14 text-center">
        <h1 className="text-2xl font-bold">Materials</h1>
        <p className="mt-4 text-sm text-mewstro-dim">
          Once you join your teacher&apos;s studio, any links, videos, or
          documents they share will appear here.
        </p>
        <Link
          href="/practice/join"
          className="mt-8 w-full rounded-2xl bg-mewstro-primary px-6 py-4 text-base font-semibold text-white shadow-sm"
        >
          Join your studio
        </Link>
      </main>
    );
  }

  const resources = await getMyResources(supabase).catch(() => []);

  return (
    <main className="flex flex-col px-6 pt-10">
      <h1 className="text-2xl font-bold">Materials</h1>
      <p className="mt-1 text-sm text-mewstro-dim">
        From {membership.studio_name} — links, videos, and documents your
        teacher has shared.
      </p>
      <MaterialsList resources={resources} />
    </main>
  );
}
