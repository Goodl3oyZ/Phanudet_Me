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
        <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
          {/* Profile block: mobile only */}
          <div className="-mt-4 min-w-0 space-y-4 md:hidden">
            <div className="flex items-center gap-4">
              <div className="relative m-1.5 size-32 shrink-0">
                <div
                  className="absolute -inset-1.5 rounded-3xl bg-accent/10"
                  aria-hidden="true"
                />
                <Image
                  src={site.photo.src}
                  alt={site.photo.alt}
                  width={128}
                  height={128}
                  priority
                  sizes="128px"
                  className="relative size-32 rounded-2xl border border-line object-cover shadow-sm"
                />
              </div>

              <div className="min-w-0">
                <p className="text-2xl font-bold leading-tight tracking-tight text-ink">
                  {site.owner}
                </p>
                <p className="mt-1 font-mono text-xs leading-snug text-ink-muted">
                  {site.location}
                </p>
              </div>
            </div>

            <p className="flex w-full items-start gap-2.5 rounded-xl border border-line bg-background px-3.5 py-2.5 text-xs font-medium leading-snug text-ink">
              <span
                className="mt-[3px] size-2 shrink-0 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              <span>{site.availability}</span>
            </p>
          </div>

          {/* Hero content */}
          <div className="min-w-0">
            {/* Availability and identity: desktop only */}
            <div className="hidden md:block">
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1 text-xs font-medium text-ink">
                <span
                  className="size-2 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                {site.availability}
              </p>

              <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted">
                {site.owner} · {site.location}
              </p>
            </div>

            <h1 className="mt-2 max-w-[22ch] text-[clamp(1.5rem,6.2vw,1.875rem)] font-semibold leading-[1.15] tracking-tight text-ink/90 md:mt-3 md:max-w-[18ch] md:text-[4rem] md:leading-[1.08] md:text-ink">
              {site.tagline}
            </h1>

            <p className="mt-4 max-w-[40rem] text-base leading-relaxed text-ink-muted md:mt-6 md:text-lg">
              {site.heroSupport}
            </p>

            <ul
              className="mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
              aria-label="Areas of interest"
            >
              {site.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-lg bg-muted px-3 py-2 text-center text-xs font-medium text-ink sm:py-1.5 sm:text-left md:text-sm"
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row [&>a]:w-full [&>a]:justify-center sm:[&>a]:w-auto">
              <PrimaryButton href="/projects">Explore Projects</PrimaryButton>
              <SecondaryButton href="/resume">View Résumé</SecondaryButton>
            </div>
          </div>

          {/* Profile image: desktop only */}
          <div className="relative mx-auto hidden w-72 shrink-0 md:block">
            <div
              className="absolute -inset-3 rounded-[2rem] bg-accent/10"
              aria-hidden="true"
            />
            <Image
              src={site.photo.src}
              alt={site.photo.alt}
              width={site.photo.width}
              height={site.photo.height}
              priority
              sizes="(min-width: 768px) 18rem, 0px"
              className="relative aspect-square w-full rounded-[1.6rem] border border-line object-cover shadow-[0_20px_50px_-28px_rgba(23,33,43,0.55)]"
            />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-[1.75rem] font-semibold tracking-tight">
              Featured projects
            </h2>
            <p className="mt-2 text-ink-muted">
              Two of them run live on my HomeLab — open them and try.
            </p>
          </div>
          <Link
            href="/projects"
            className="shrink-0 text-sm font-medium text-accent"
          >
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
        <h2 className="text-[1.75rem] font-semibold tracking-tight">
          Engineering approach
        </h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {technicalFocus.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-line bg-background p-6"
            >
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
        <h2 className="text-[1.75rem] font-semibold tracking-tight">
          Background
        </h2>
        <div className="mt-6 max-w-[45rem] space-y-4 text-ink-muted">
          <p>
            {site.education.degree} from {site.education.school} (
            {site.education.location}), GPA {site.education.gpa}. Work so far is
            academic, personal, and team project experience — not a claim of
            years in industry.
          </p>
          <p>{site.introduction}</p>
        </div>
      </Section>

      <Section>
        <div className="rounded-2xl border border-line bg-muted px-6 py-10 md:px-10">
          <h2 className="text-[1.75rem] font-semibold tracking-tight">
            Start a conversation
          </h2>
          <p className="mt-3 max-w-xl text-ink-muted">
            For roles in software, ML, infrastructure, or technical solutions,
            use the verified contact details.
          </p>
          <div className="mt-6">
            <PrimaryButton href="/contact">Contact</PrimaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}