import type { Brand } from "@/config/brands";

export type PricingTier = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
};

export function PricingTable({
  brand,
  tiers,
}: {
  brand: Brand;
  tiers: PricingTier[];
}) {
  return (
    <section
      id="pricing"
      className="py-20 md:py-28"
      style={{ backgroundColor: brand.colors.surface }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: brand.colors.text }}
          >
            Simple Pricing
          </h2>
          <p
            className="mt-4 text-lg"
            style={{ color: brand.colors.textDim }}
          >
            No subscriptions required. No ads. Ever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="rounded-2xl p-8 flex flex-col relative"
              style={{
                backgroundColor: tier.highlighted
                  ? brand.colors.primary
                  : brand.colors.background,
                border: tier.highlighted
                  ? "none"
                  : `1px solid ${brand.colors.textDim}22`,
              }}
            >
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: brand.colors.secondary,
                    color: brand.colors.primaryForeground,
                  }}
                >
                  Most Popular
                </div>
              )}
              <h3
                className="text-xl font-bold"
                style={{
                  color: tier.highlighted
                    ? brand.colors.primaryForeground
                    : brand.colors.text,
                }}
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className="text-4xl font-extrabold"
                  style={{
                    color: tier.highlighted
                      ? brand.colors.primaryForeground
                      : brand.colors.text,
                  }}
                >
                  {tier.price}
                </span>
                {tier.period && (
                  <span
                    className="text-sm"
                    style={{
                      color: tier.highlighted
                        ? `${brand.colors.primaryForeground}cc`
                        : brand.colors.textDim,
                    }}
                  >
                    {tier.period}
                  </span>
                )}
              </div>
              <p
                className="mt-2 text-sm"
                style={{
                  color: tier.highlighted
                    ? `${brand.colors.primaryForeground}cc`
                    : brand.colors.textDim,
                }}
              >
                {tier.description}
              </p>
              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                    style={{
                      color: tier.highlighted
                        ? brand.colors.primaryForeground
                        : brand.colors.text,
                    }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0"
                      style={{
                        color: tier.highlighted
                          ? brand.colors.primaryForeground
                          : brand.colors.primary,
                      }}
                    >
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={brand.links.appStore}
                className="mt-8 block text-center rounded-full px-6 py-3 text-sm font-semibold transition-transform hover:scale-105"
                style={{
                  backgroundColor: tier.highlighted
                    ? brand.colors.primaryForeground
                    : brand.colors.primary,
                  color: tier.highlighted
                    ? brand.colors.primary
                    : brand.colors.primaryForeground,
                }}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
