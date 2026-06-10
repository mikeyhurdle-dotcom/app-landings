"use client";

import { useRouter } from "next/navigation";
import { StudioJoinFlow } from "./StudioJoinFlow";

/** Standalone /practice/join wrapper — navigates home when done. */
export function JoinPageFlow({
  userId,
  initialCode,
  profileDisplayName,
}: {
  userId: string;
  initialCode: string;
  profileDisplayName: string | null;
}) {
  const router = useRouter();

  function goHome() {
    router.push("/practice");
    router.refresh();
  }

  return (
    <StudioJoinFlow
      userId={userId}
      initialCode={initialCode}
      profileDisplayName={profileDisplayName}
      showNameOverride
      skipLabel="Maybe later"
      onSkip={goHome}
      onDone={goHome}
    />
  );
}
