import type { ReactNode } from "react";
import { ResumeActions } from "@/components/content/ResumeActions";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { projects } from "@/content/projects";
import { certifications, site, skillGroups } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { resumePdfExists } from "@/lib/resume-pdf";

export const metadata = pageMetadata(
  "Résumé",
  "HTML résumé for Phanudet Sueaphueak, aligned with the PDF when the file is present.",
  "/resume",
);

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

export default function ResumePage() {
  const pdfAvailable = resumePdfExists();

  return (
    <Container>
      <PageHeader
        eyebrow="Résumé"
        title={site.owner}
        description="Software development, AI/ML, and cloud and DevOps — Computer Engineering graduate."
      />

      <div className="space-y-8 pb-16">
        <ResumeActions pdfAvailable={pdfAvailable} />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-14">
          {/* Main column */}
          <div className="min-w-0 space-y-10">
            <Block title="Professional summary">
              <p className="max-w-[42rem] leading-relaxed text-ink-muted">
                {site.introduction}
              </p>
            </Block>

            <Block title="Selected projects">
              <ul className="grid gap-4">
                {projects.map((project) => (
                  <li
                    key={project.slug}
                    className="rounded-2xl border border-line bg-background p-5"
                  >
                    <TextLink
                      href={`/projects/${project.slug}`}
                      className="text-base font-semibold"
                    >
                      {project.title}
                    </TextLink>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {project.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </Block>

            {pdfAvailable ? (
              <details className="group hidden rounded-2xl border border-line md:block">
                <summary className="flex cursor-pointer select-none list-none items-center gap-3 px-5 py-4 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="size-5 shrink-0 text-accent"
                    aria-hidden="true"
                  >
                    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
                    <path d="M14 3v5h5" />
                    <path d="M9 13h6M9 17h4" />
                  </svg>
                  <span className="group-open:hidden">Preview PDF</span>
                  <span className="hidden group-open:inline">Hide PDF preview</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-auto size-4 shrink-0 text-ink-muted transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <iframe
                  title="Résumé PDF preview"
                  src={site.resumePdf.href}
                  className="h-[36rem] w-full rounded-b-2xl border-t border-line bg-muted"
                />
              </details>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <Block title="Education">
              <div className="rounded-2xl border border-line bg-muted p-5">
                <p className="font-semibold leading-snug">{site.education.degree}</p>
                <p className="mt-1 text-sm text-ink-muted">{site.education.school}</p>
                <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-ink-muted">
                  <span>GPA {site.education.gpa}</span>
                  <span aria-hidden="true">·</span>
                  <span>{site.education.location}</span>
                </p>
              </div>
            </Block>

            <Block title="Technical skills">
              <dl className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <dt className="text-sm font-medium">{group.label}</dt>
                    <dd className="mt-2">
                      <ul className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-md bg-muted px-2 py-1 text-xs text-ink"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block title="Certifications">
              <ul>
                {certifications.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-sm last:border-0"
                  >
                    <span>{item.name}</span>
                    <span className="shrink-0 font-mono text-xs text-ink-muted">
                      {item.year}
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Languages">
              <ul className="space-y-2 text-sm">
                {site.languages.map((item) => (
                  <li key={item.name} className="flex justify-between gap-4">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-right text-ink-muted">{item.detail}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Contact">
              <p className="text-sm text-ink-muted">{site.location}</p>
              <p className="mt-1 break-all text-sm text-ink">{site.contact.email}</p>
            </Block>
          </aside>
        </div>
      </div>
    </Container>
  );
}