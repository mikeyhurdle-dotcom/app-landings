import Image from "next/image";
import type { Brand } from "@/config/brands";
import { AppStoreBadge } from "./AppStoreBadge";

export function HeroSection({
  brand,
  children,
}: {
  brand: Brand;
  children?: React.ReactNode;
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: brand.colors.background }}
    >
      {/* Gradient accent blob */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: brand.colors.primary }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: brand.colors.secondary }}
      />

      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h1
              className="text-4xl md:text-6xl font-extrabold tracking-tight"
              style={{ color: brand.colors.text }}
            >
              {brand.name}
            </h1>
            <p
              className="mt-3 text-xl md:text-2xl font-medium"
              style={{ color: brand.colors.primary }}
            >
              {brand.tagline}
            </p>
            <p
              className="mt-6 text-lg max-w-xl leading-relaxed"
              style={{ color: brand.colors.textDim }}
            >
              {brand.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <AppStoreBadge brand={brand} platform="ios" />
            </div>
            {children}
          </div>

          {/* Mascot + App Icon */}
          <div className="flex-shrink-0 relative">
            <Image
              src="/mewstro/mascot-celebrating.png"
              alt="Mewstro the cat conductor celebrating"
              width={360}
              height={360}
              className="drop-shadow-2xl"
              priority
            />
            <div className="absolute -bottom-4 -left-4">
              <Image
                src={brand.logo}
                alt={`${brand.name} app icon`}
                width={80}
                height={80}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
