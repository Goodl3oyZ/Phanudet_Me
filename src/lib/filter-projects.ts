import type { FilterCategory, Project } from "@/content/types";

export function filterProjects(
  projects: readonly Project[],
  category: FilterCategory,
): Project[] {
  if (category === "All") {
    return [...projects];
  }
  return projects.filter((project) => project.filters.includes(category));
}

export function isFilterCategory(value: string): value is FilterCategory {
  return (
    value === "All" ||
    value === "Software" ||
    value === "AI / ML" ||
    value === "Infrastructure" ||
    value === "Team Projects"
  );
}
