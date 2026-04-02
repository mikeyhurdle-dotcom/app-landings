import type { Brand } from "@/config/brands";

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export function FeatureCard({
  feature,
  brand,
}: {
  feature: Feature;
  brand: Brand;
}) {
  return (
    <div
      className="rounded-2xl p-6 transition-transform hover:scale-[1.02]"
      style={{
        backgroundColor: brand.colors.surface,
        border: `1px solid ${brand.colors.textDim}15`,
      }}
    >
      <div className="text-3xl mb-4">{feature.icon}</div>
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: brand.colors.text }}
      >
        {feature.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: brand.colors.textDim }}>
        {feature.description}
      </p>
    </div>
  );
}
