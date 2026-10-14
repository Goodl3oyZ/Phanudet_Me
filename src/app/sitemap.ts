import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getNoteSlugs } from "@/lib/notes";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  if (!origin) {
    return [];
  }

  const routes = [
    "",
    "/projects",
    "/about",
    "/notes",
    "/resume",
    "/contact",
    "/privacy",
    ...projects.map((project) => `/projects/${project.slug}`),
    ...getNoteSlugs().map((slug) => `/notes/${slug}`),
  ];

  return routes.map((path) => ({
    url: `${origin}${path}`,
  }));
}
