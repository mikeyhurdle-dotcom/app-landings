import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-white mb-2">App Landings</h1>
        <p className="text-gray-400 mb-12">Choose an app to view its landing page.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/mewstro"
            className="group rounded-2xl p-8 bg-gray-900 border border-gray-800 hover:border-[#F4845F] transition-all hover:scale-[1.02]"
          >
            <Image
              src="/mewstro/mascot.webp"
              alt="Mewstro"
              width={80}
              height={80}
              className="rounded-xl mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-white group-hover:text-[#F4845F] transition-colors">
              Mewstro
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Your Practice Companion
            </p>
          </Link>

          <Link
            href="/smashd"
            className="group rounded-2xl p-8 bg-gray-900 border border-gray-800 hover:border-[#CCFF00] transition-all hover:scale-[1.02]"
          >
            <Image
              src="/smashd/logo-on-dark.png"
              alt="SMASHD"
              width={80}
              height={80}
              className="rounded-xl mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-white group-hover:text-[#CCFF00] transition-colors">
              SMASHD
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              The Community Hub for Padel
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
