"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Brand } from "@/config/brands";

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

function DeviceFrame({
  screenshot,
  brand,
}: {
  screenshot: Screenshot;
  brand: Brand;
}) {
  const isDark = brand.id === "smashd";

  return (
    <div className="flex-shrink-0 w-[260px] md:w-[280px] snap-center">
      {/* iPhone-style device frame */}
      <div
        className="relative mx-auto rounded-[40px] p-3 shadow-2xl"
        style={{
          backgroundColor: isDark ? "#1C1C1E" : "#F5F5F7",
          border: `3px solid ${isDark ? "#2C2C2E" : "#D1D1D6"}`,
        }}
      >
        {/* Notch / Dynamic Island */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] rounded-b-2xl z-10"
          style={{ backgroundColor: isDark ? "#1C1C1E" : "#F5F5F7" }}
        />

        {/* Screen */}
        <div className="relative rounded-[28px] overflow-hidden aspect-[9/19.5] bg-black">
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
      </div>

      {/* Caption */}
      <p
        className="mt-4 text-center text-sm font-medium"
        style={{ color: brand.colors.text }}
      >
        {screenshot.caption}
      </p>
    </div>
  );
}

export function ScreenshotCarousel({
  brand,
  screenshots,
  title = "See it in action",
  subtitle,
}: {
  brand: Brand;
  screenshots: Screenshot[];
  title?: string;
  subtitle?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="screenshots"
      className="py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: brand.colors.surface }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: brand.colors.text }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="mt-4 text-lg max-w-2xl mx-auto"
              style={{ color: brand.colors.textDim }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
          style={{
            backgroundColor: `${brand.colors.surface}cc`,
            border: `1px solid ${brand.colors.textDim}33`,
          }}
          aria-label="Scroll left"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke={brand.colors.text}
            strokeWidth="2"
          >
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110"
          style={{
            backgroundColor: `${brand.colors.surface}cc`,
            border: `1px solid ${brand.colors.textDim}33`,
          }}
          aria-label="Scroll right"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke={brand.colors.text}
            strokeWidth="2"
          >
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory px-8 md:px-16 pb-4 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Leading spacer for centering */}
          <div className="flex-shrink-0 w-[calc(50vw-170px)] md:w-[calc(50vw-180px)]" />

          {screenshots.map((screenshot) => (
            <DeviceFrame
              key={screenshot.src}
              screenshot={screenshot}
              brand={brand}
            />
          ))}

          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-[calc(50vw-170px)] md:w-[calc(50vw-180px)]" />
        </div>
      </div>
    </section>
  );
}
