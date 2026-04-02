import type { Brand } from "@/config/brands";

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export function TestimonialSection({
  brand,
  testimonials,
}: {
  brand: Brand;
  testimonials: Testimonial[];
}) {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: brand.colors.background }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: brand.colors.text }}
          >
            What People Are Saying
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="rounded-2xl p-8"
              style={{
                backgroundColor: brand.colors.surface,
                border: `1px solid ${brand.colors.textDim}15`,
              }}
            >
              <p
                className="text-sm leading-relaxed italic"
                style={{ color: brand.colors.text }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6">
                <p
                  className="text-sm font-semibold"
                  style={{ color: brand.colors.text }}
                >
                  {t.author}
                </p>
                <p
                  className="text-xs"
                  style={{ color: brand.colors.textDim }}
                >
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
