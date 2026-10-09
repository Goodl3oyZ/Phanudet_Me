import Link from "next/link";
import type { Project } from "@/content/types";
import { TechnologyTag } from "@/components/project/TechnologyTag";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-background p-6 shadow-[0_1px_2px_rgba(23,33,43,0.04)] transition-colors hover:border-accent/40">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
        {project.category}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">
        <Link href={`/projects/${project.slug}`} className="hover:text-accent">
          {project.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{project.summary}</p>
      {project.technologies.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <li key={tech}>
              <TechnologyTag label={tech} />
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-5 text-sm font-medium text-accent">
        <Link href={`/projects/${project.slug}`}>View case study</Link>
      </p>
    </article>
  );
}
