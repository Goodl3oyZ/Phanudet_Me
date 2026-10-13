import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { getProjectBySlug, projects } from "@/content/projects";

describe("project slugs", () => {
  it("are unique and required", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(slugs.every((slug) => /^[a-z0-9-]+$/.test(slug))).toBe(true);
  });

  it("resolves a known slug", () => {
    expect(getProjectBySlug("ecommerce-platform")?.title).toBe("E-Commerce Platform");
  });

  it("returns undefined for an invalid slug", () => {
    expect(getProjectBySlug("not-a-real-project")).toBeUndefined();
  });

  it("does not publish unverified external URLs", () => {
    for (const project of projects) {
      for (const evidence of project.evidence ?? []) {
        expect(evidence.href.startsWith("https://")).toBe(true);
      }
    }
  });
});

describe("project images", () => {
  const publicFile = (src: string) => path.join(process.cwd(), "public", src);

  it("point at files in /public with alt text", () => {
    for (const project of projects) {
      for (const image of project.images ?? []) {
        expect(image.src.startsWith("/images/")).toBe(true);
        expect(existsSync(publicFile(image.src))).toBe(true);
        expect(image.alt.length).toBeGreaterThan(10);
      }
    }
  });

  it("include the profile photo and social preview", () => {
    expect(existsSync(publicFile(site.photo.src))).toBe(true);
    expect(existsSync(publicFile("/images/og.png"))).toBe(true);
  });

  it("only link live sites over https", () => {
    for (const project of projects) {
      if (project.liveUrl) expect(project.liveUrl.startsWith("https://")).toBe(true);
    }
  });
});
