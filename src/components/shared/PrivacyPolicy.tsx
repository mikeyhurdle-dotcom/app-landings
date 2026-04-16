import type { Brand } from "@/config/brands";

export function PrivacyPolicy({
  brand,
  sections,
  title = "Privacy Policy",
}: {
  brand: Brand;
  sections: { title: string; content: string }[];
  title?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl prose-sm">
      <h1
        className="text-3xl md:text-4xl font-bold mb-2"
        style={{ color: brand.colors.text }}
      >
        {title}
      </h1>
      <p className="text-sm mb-12" style={{ color: brand.colors.textDim }}>
        Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      {sections.map((section) => (
        <div key={section.title} className="mb-10">
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: brand.colors.text }}
          >
            {section.title}
          </h2>
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: brand.colors.textDim }}
          >
            {section.content}
          </p>
        </div>
      ))}
    </div>
  );
}
