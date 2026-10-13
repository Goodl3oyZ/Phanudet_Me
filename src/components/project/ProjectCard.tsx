import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Code2, ServerCog, UsersRound, type LucideIcon } from "lucide-react";
import type { Project, ProjectCategory } from "@/content/types";
import { TechnologyTag } from "@/components/project/TechnologyTag";

const CATEGORY_ICON: Record<ProjectCategory, LucideIcon> = {
  Software: Code2,
  "AI / ML": BrainCircuit,
  Infrastructure: ServerCog,
  "Team Projects": UsersRound,
};

/** Cover for projects without screenshots, so every card in a row lines up. */
function FallbackCover({ project }: { project: Project }) {
  const Icon = CATEGORY_ICON[project.category];
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,var(--surface),var(--muted))]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-background text-accent shadow-sm">
          <Icon size={30} aria-hidden />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-muted">
          {project.technologies.slice(0, 3).join(" · ")}
        </span>
      </div>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images?.[0];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-background shadow-[0_1px_2px_rgba(23,33,43,0.04)] transition-colors hover:border-accent/40">
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[16/10] overflow-hidden border-b border-line bg-muted"
      >
        {cover ? (
          <Image
            src={cover.src}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
          />
        ) : (
          <FallbackCover project={project} />
        )}
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            {project.category}
          </p>
          {project.liveUrl ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              Live
            </span>
          ) : null}
        </div>
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
        <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-accent">
          <Link href={`/projects/${project.slug}`}>View case study</Link>
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Open live site ↗
            </a>
          ) : null}
        </p>
      </div>
    </article>
  );
}
