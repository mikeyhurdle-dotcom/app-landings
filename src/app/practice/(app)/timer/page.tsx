import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/practice/supabase/server";
import { TimerView } from "@/components/practice/TimerView";

export const metadata: Metadata = { title: "Practice Timer" };

export default async function TimerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/practice/sign-in");

  return <TimerView userId={user.id} />;
}
