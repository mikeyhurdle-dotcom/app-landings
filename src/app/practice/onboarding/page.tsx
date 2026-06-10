import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/practice/supabase/server";
import { fetchDisplayName } from "@/lib/practice/studio";
import { OnboardingFlow } from "@/components/practice/OnboardingFlow";

export const metadata: Metadata = { title: "Welcome" };

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/practice/sign-in");

  const { next } = await searchParams;
  const displayName = await fetchDisplayName(supabase, user.id);

  return (
    <OnboardingFlow
      userId={user.id}
      initialDisplayName={displayName ?? ""}
      next={next && next.startsWith("/practice") ? next : "/practice"}
    />
  );
}
