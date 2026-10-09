import type { ReactNode } from "react";
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
  return pageMetadata(project.title, project.summary, `/projects/${project.slug}`);
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

  return (
    <Container>
      <PageHeader eyebrow="Case study" title={project.title} description={project.summary} />
      <div className="max-w-[45rem] pb-16">
        <ProjectMetadata project={project} />

        <Block title="Overview">
          <p>{project.overview}</p>
        </Block>

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
