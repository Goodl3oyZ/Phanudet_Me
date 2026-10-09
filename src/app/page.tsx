import Link from "next/link";
import { ProjectCard } from "@/components/project/ProjectCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { Section } from "@/components/ui/Section";
import { featuredProjects } from "@/content/projects";
import { site, technicalFocus } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Building software. Understanding systems.",
  site.heroSupport,
  "/",
);

export default function HomePage() {
  const featured = featuredProjects();

  return (
    <>
      <Section>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
          Computer Engineering · {site.location}
        </p>
        <h1 className="mt-4 max-w-[18ch] text-[2.75rem] font-semibold leading-[1.08] tracking-tight md:text-[4rem]">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-[42rem] text-lg text-ink-muted">{site.heroSupport}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton href="/projects">Explore Projects</PrimaryButton>
          <SecondaryButton href="/resume">View Résumé</SecondaryButton>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.75rem] font-semibold tracking-tight">Featured projects</h2>
            <p className="mt-2 text-ink-muted">
              Selected work documented from the résumé and available source files.
            </p>
          </div>
          <Link href="/projects" className="shrink-0 text-sm font-medium text-accent">
            All projects
          </Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-[1.75rem] font-semibold tracking-tight">Engineering approach</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {technicalFocus.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line bg-background p-6">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-accent">
                {item.title}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{item.area}</h3>
              <p className="mt-3 text-sm text-ink-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <h2 className="text-[1.75rem] font-semibold tracking-tight">Background</h2>
        <div className="mt-6 max-w-[45rem] space-y-4 text-ink-muted">
          <p>
            {site.education.degree} from {site.education.school} ({site.education.location}), GPA{" "}
            {site.education.gpa}. Work so far is academic, personal, and team project experience —
            not a claim of years in industry.
          </p>
          <p>{site.introduction}</p>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-line bg-muted px-6 py-10 md:px-10">
          <h2 className="text-[1.75rem] font-semibold tracking-tight">Start a conversation</h2>
          <p className="mt-3 max-w-xl text-ink-muted">
            For roles in software, ML, infrastructure, or technical solutions, use the verified
            contact details.
          </p>
          <div className="mt-6">
            <PrimaryButton href="/contact">Contact</PrimaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
