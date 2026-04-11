import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#FFFBF7]">
      <div className="text-center max-w-md">
        <Image
          src="/mewstro/mascot-sleeping.png"
          alt="Mewstro sleeping on music sheets"
          width={200}
          height={200}
          className="mx-auto mb-8 drop-shadow-lg"
        />
        <h1 className="text-6xl font-bold text-[#1A1A2E]">404</h1>
        <p className="mt-4 text-lg text-[#6B7280]">
          Mewstro fell asleep and lost this page. Let&apos;s get you back on
          track.
        </p>
        <Link
          href="/mewstro"
          className="mt-8 inline-block rounded-full px-8 py-3 text-sm font-semibold bg-[#2D8B7E] text-white hover:bg-[#246F64] transition-colors"
        >
          Back to Mewstro
        </Link>
      </div>
    </div>
  );
}
