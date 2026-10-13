import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { EvidencePanel } from "@/components/project/EvidencePanel";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProjectMetadata } from "@/components/project/ProjectMetadata";
import { TechnologyTag } from "@/components/project/TechnologyTag";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { getProjectBySlug, getRelatedProjects, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return pageMetadata("Project not found", "No case study matches this URL.", "/projects");
  }
  return pageMetadata(project.title, project.summary, `/projects/${project.slug}`, project.images?.[0]?.src);
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="text-[1.75rem] font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 space-y-3 text-ink">{children}</div>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  const related = getRelatedProjects(project);
  const [cover, ...gallery] = project.images ?? [];

  return (
    <Container>
      <PageHeader eyebrow="Case study" title={project.title} description={project.summary} />
      {project.liveUrl ? (
        <p className="-mt-4 mb-8">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Open live site ↗
          </a>
        </p>
      ) : null}
      {cover ? (
        <figure className="mb-12">
          <div className="overflow-hidden rounded-2xl border border-line bg-muted shadow-[0_12px_40px_-24px_rgba(23,33,43,0.45)]">
            <Image
              src={cover.src}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="h-auto w-full"
            />
          </div>
          {cover.caption ? <figcaption className="mt-3 text-sm text-ink-muted">{cover.caption}</figcaption> : null}
        </figure>
      ) : null}
      <div className="max-w-[45rem] pb-16">
        <ProjectMetadata project={project} />

        <Block title="Overview">
          <p>{project.overview}</p>
        </Block>

        {gallery.length > 0 ? (
          <Block title="Screenshots">
            <ul className="grid gap-6">
              {gallery.map((image) => (
                <li key={image.src}>
                  <figure>
                    <div className="overflow-hidden rounded-xl border border-line bg-muted">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 768px) 45rem, 100vw"
                        className="h-auto w-full"
                      />
                    </div>
                    {image.caption ? (
                      <figcaption className="mt-2 text-sm text-ink-muted">{image.caption}</figcaption>
                    ) : null}
                  </figure>
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.problem || project.intendedUsers ? (
          <Block title="Problem and intended users">
            {project.problem ? <p>{project.problem}</p> : null}
            {project.intendedUsers ? <p>{project.intendedUsers}</p> : null}
          </Block>
        ) : null}

        <Block title="Role">
          <p>{project.role}</p>
        </Block>

        {project.teamContribution ? (
          <Block title="Team contribution">
            <p>{project.teamContribution}</p>
          </Block>
        ) : null}

        {project.technologies.length > 0 ? (
          <Block title="Technology stack">
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <TechnologyTag label={tech} />
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.architecture ? (
          <Block title="Architecture">
            <ArchitectureDiagram architecture={project.architecture} />
          </Block>
        ) : null}

        {project.implementation?.length ? (
          <Block title="Implementation">
            <ul className="list-disc space-y-2 pl-5">
              {project.implementation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.decisions?.length ? (
          <Block title="Decisions and trade-offs">
            {project.decisions.map((decision) => (
              <div key={decision.title}>
                <h3 className="text-lg font-semibold">{decision.title}</h3>
                <p className="mt-2">{decision.body}</p>
              </div>
            ))}
          </Block>
        ) : null}

        {project.evidence?.length ? (
          <Block title="Evidence">
            <EvidencePanel items={project.evidence} />
          </Block>
        ) : null}

        {project.verification?.length ? (
          <Block title="Testing and verification">
            <ul className="list-disc space-y-2 pl-5">
              {project.verification.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.limitations?.length ? (
          <Block title="Known limitations">
            <ul className="list-disc space-y-2 pl-5">
              {project.limitations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>
        ) : null}

        {project.lessons?.length ? (
          <Block title="Lessons learned">
            <ul className="list-disc space-y-2 pl-5">
              {project.lessons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>
        ) : null}

        {related.length > 0 ? (
          <Block title="Related projects">
            <ul className="grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <ProjectCard project={item} />
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        <p className="mt-12 text-sm">
          <TextLink href="/projects">Back to all projects</TextLink>
        </p>
      </div>
    </Container>
  );
}
