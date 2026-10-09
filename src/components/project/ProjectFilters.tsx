"use client";

import { FILTER_CATEGORIES, type FilterCategory, type Project } from "@/content/types";
import { filterProjects } from "@/lib/filter-projects";
import { ProjectGrid } from "@/components/project/ProjectGrid";
import { useMemo, useState } from "react";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<FilterCategory>("All");
  const visible = useMemo(
    () => filterProjects(projects, category),
    [projects, category],
  );

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {FILTER_CATEGORIES.map((item) => {
          const selected = item === category;
          return (
            <button
              key={item}
              type="button"
              aria-pressed={selected}
              onClick={() => setCategory(item)}
              className={`min-h-11 rounded-full border px-4 text-sm transition-colors ${
                selected
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-background text-ink hover:bg-muted"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <ProjectGrid projects={visible} />
      </div>
    </div>
  );
}
