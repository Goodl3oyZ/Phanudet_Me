import { describe, expect, it } from "vitest";
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
