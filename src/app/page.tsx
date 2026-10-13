import Image from "next/image";
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
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1 text-xs font-medium text-ink">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
              {site.availability}
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
              {site.owner} · {site.location}
            </p>
            <h1 className="mt-3 max-w-[18ch] text-[2.75rem] font-semibold leading-[1.08] tracking-tight md:text-[4rem]">
              {site.tagline}
            </h1>
            <p className="mt-6 max-w-[40rem] text-lg text-ink-muted">{site.heroSupport}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
              {site.roles.map((role) => (
                <li key={role} className="rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-ink">
                  {role}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton href="/projects">Explore Projects</PrimaryButton>
              <SecondaryButton href="/resume">View Résumé</SecondaryButton>
            </div>
          </div>
          <div className="relative order-first w-36 shrink-0 sm:w-48 md:order-none md:mx-auto md:w-72">
            <div className="absolute -inset-3 rounded-[2rem] bg-accent/10" aria-hidden />
            <Image
              src={site.photo.src}
              alt={site.photo.alt}
              width={site.photo.width}
              height={site.photo.height}
              priority
              sizes="(min-width: 768px) 18rem, 16rem"
              className="relative aspect-square w-full rounded-[1.6rem] border border-line object-cover shadow-[0_20px_50px_-28px_rgba(23,33,43,0.55)]"
            />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.75rem] font-semibold tracking-tight">Featured projects</h2>
            <p className="mt-2 text-ink-muted">
              Two of them run live on my HomeLab — open them and try.
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
