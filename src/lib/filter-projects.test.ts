import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { filterProjects, isFilterCategory } from "@/lib/filter-projects";

describe("filterProjects", () => {
  it("returns every project for All", () => {
    expect(filterProjects(projects, "All")).toHaveLength(projects.length);
  });

  it("keeps AI / ML work only", () => {
    const result = filterProjects(projects, "AI / ML");
    expect(result.every((project) => project.filters.includes("AI / ML"))).toBe(true);
    expect(result.map((project) => project.slug)).toContain("mlp-genetic-fuzzy");
    expect(result.map((project) => project.slug)).not.toContain("restaurant-pos");
  });

  it("includes team-tagged work under Team Projects", () => {
    const result = filterProjects(projects, "Team Projects");
    expect(result.map((project) => project.slug)).toEqual(
      expect.arrayContaining(["edverra", "skill-bridge", "restaurant-pos"]),
    );
  });

  it("returns an empty list when nothing matches a category", () => {
    expect(filterProjects([], "Software")).toEqual([]);
  });
});

describe("isFilterCategory", () => {
  it("accepts known categories", () => {
    expect(isFilterCategory("Software")).toBe(true);
    expect(isFilterCategory("unknown")).toBe(false);
  });
});
