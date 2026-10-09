import type { Metadata } from "next";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export function pageMetadata(title: string, description: string, path = ""): Metadata {
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
    },
  };
}
