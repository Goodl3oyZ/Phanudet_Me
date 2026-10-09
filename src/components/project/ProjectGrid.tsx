import type { Project } from "@/content/types";
import { ProjectCard } from "@/components/project/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <EmptyState
        title="No projects in this category"
        body="Try another filter. Categories only include work that is documented in the résumé or available source files."
      />
    );
  }

  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
