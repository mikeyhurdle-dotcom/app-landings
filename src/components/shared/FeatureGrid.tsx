import type { Brand } from "@/config/brands";
import { FeatureCard, type Feature } from "./FeatureCard";

export function FeatureGrid({
  brand,
  features,
  title = "Features",
  subtitle,
}: {
  brand: Brand;
  features: Feature[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <section
      id="features"
      className="py-20 md:py-28"
      style={{ backgroundColor: brand.colors.background }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
