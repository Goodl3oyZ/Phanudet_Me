import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "Computer Engineering graduate building software, exploring machine learning, and operating local infrastructure.",
  "/about",
);

const next = [
  {
    title: "Projects",
    body: "Case studies with architecture, decisions, and limitations.",
    href: "/projects",
  },
  {
    title: "Résumé",
    body: "Education, skills, certifications, and languages.",
    href: "/resume",
  },
  {
    title: "Contact",
    body: "Verified contact details for roles and questions.",
    href: "/contact",
  },
];

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="border-b border-line pb-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <Container>
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-10">
        <PageHeader eyebrow="About" title={site.owner} description={site.introduction} />
        <Image
          src={site.photo.src}
          alt={site.photo.alt}
          width={site.photo.width}
          height={site.photo.height}
          sizes="(min-width: 768px) 12rem, 8rem"
          className="order-first aspect-square w-32 rounded-2xl border border-line object-cover shadow-sm md:order-last md:mb-8 md:w-48 md:rounded-3xl"
        />
      </div>

      <div className="max-w-[45rem] space-y-10 pb-16">
        <Block title="What I'm looking for">
          <p className="flex items-start gap-2.5 text-sm font-medium leading-snug">
            <span
              className="mt-[5px] size-2 shrink-0 rounded-full bg-emerald-500"
              aria-hidden="true"
            />
            {site.availability}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Areas of interest">
            {site.roles.map((role) => (
              <li
                key={role}
                className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-ink md:text-sm"
              >
                {role}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">Based in {site.location}.</p>
        </Block>

        <Block title="How I work">
          <blockquote className="rounded-r-2xl border-l-2 border-accent bg-muted p-5 leading-relaxed">
            Prefer implementations that can be inspected: modules with clear boundaries,
            evaluation methods that are written down, and infrastructure that is documented
            without overstating what is in production. AI is a tool to evaluate, not a default
            architecture.
          </blockquote>
        </Block>

        <Block title="Keep exploring">
          <ul className="grid gap-4 sm:grid-cols-3">
            {next.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col rounded-2xl border border-line bg-background p-5 transition-colors hover:border-accent"
                >
                  <span className="font-semibold">{item.title} →</span>
                  <span className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Block>
      </div>
    </Container>
  );
}