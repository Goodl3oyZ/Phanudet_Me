import type { Metadata } from "next";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/** Social preview used when a page has no image of its own. */
export const DEFAULT_OG_IMAGE = "/images/og.png";

export function pageMetadata(title: string, description: string, path = "", image = DEFAULT_OG_IMAGE): Metadata {
  const siteUrl = getSiteUrl();
  const canonical = siteUrl ? `${siteUrl}${path}` : undefined;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: `${title} · ${site.brand}`,
      description,
      type: "website",
      url: canonical,
      siteName: site.brand,
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", images: [image] },
  };
}
