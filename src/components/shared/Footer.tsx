import Link from "next/link";
import type { Brand } from "@/config/brands";

export function Footer({ brand }: { brand: Brand }) {
  const base = `/${brand.id}`;
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: brand.colors.surface,
        borderColor: `${brand.colors.textDim}22`,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p
              className="text-lg font-bold"
              style={{ color: brand.colors.text }}
            >
              {brand.name}
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: brand.colors.textDim }}
            >
              {brand.tagline}
            </p>
          </div>

          {/* Product */}
          <div>
            <p
              className="text-sm font-semibold mb-3"
              style={{ color: brand.colors.text }}
            >
              Product
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`${base}#features`}
                  className="text-sm hover:opacity-80 transition-colors"
                  style={{ color: brand.colors.textDim }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href={`${base}#pricing`}
                  className="text-sm hover:opacity-80 transition-colors"
                  style={{ color: brand.colors.textDim }}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p
              className="text-sm font-semibold mb-3"
              style={{ color: brand.colors.text }}
            >
              Legal
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href={brand.links.privacy}
                  className="text-sm hover:opacity-80 transition-colors"
                  style={{ color: brand.colors.textDim }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href={brand.links.support}
                  className="text-sm hover:opacity-80 transition-colors"
                  style={{ color: brand.colors.textDim }}
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          {brand.social && (
            <div>
              <p
                className="text-sm font-semibold mb-3"
                style={{ color: brand.colors.text }}
              >
                Follow Us
              </p>
              <ul className="space-y-2">
                {brand.social.instagram && (
                  <li>
                    <a
                      href={brand.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-80 transition-colors"
                      style={{ color: brand.colors.textDim }}
                    >
                      Instagram
                    </a>
                  </li>
                )}
                {brand.social.tiktok && (
                  <li>
                    <a
                      href={brand.social.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-80 transition-colors"
                      style={{ color: brand.colors.textDim }}
                    >
                      TikTok
                    </a>
                  </li>
                )}
                {brand.social.twitter && (
                  <li>
                    <a
                      href={brand.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:opacity-80 transition-colors"
                      style={{ color: brand.colors.textDim }}
                    >
                      Twitter
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        <div
          className="mt-12 pt-6 border-t text-center text-sm"
          style={{
            borderColor: `${brand.colors.textDim}22`,
            color: brand.colors.textDim,
          }}
        >
          &copy; {year} {brand.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
