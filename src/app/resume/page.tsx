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

export default function ResumePage() {
  const pdfAvailable = resumePdfExists();

  return (
    <Container>
      <PageHeader
        eyebrow="Résumé"
        title={site.owner}
        description="Software development, AI/ML, and cloud and DevOps — Computer Engineering graduate."
      />
      <div className="max-w-[45rem] space-y-10 pb-16">
        <ResumeActions pdfAvailable={pdfAvailable} />

        {pdfAvailable ? (
          <iframe
            title="Résumé PDF preview"
            src={site.resumePdf.href}
            className="h-[32rem] w-full rounded-2xl border border-line bg-muted"
          />
        ) : null}

        <section>
          <h2 className="text-[1.75rem] font-semibold">Professional summary</h2>
          <p className="mt-4">{site.introduction}</p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Education</h2>
          <p className="mt-4">
            {site.education.school} — {site.education.degree} — GPA {site.education.gpa} |{" "}
            {site.education.location}
          </p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Technical skills</h2>
          <dl className="mt-4 space-y-3">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <dt className="font-medium">{group.label}</dt>
                <dd className="text-sm text-ink-muted">{group.items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Selected projects</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            {projects.map((project) => (
              <li key={project.slug}>
                <TextLink href={`/projects/${project.slug}`}>{project.title}</TextLink>
                {" — "}
                {project.summary}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Certifications</h2>
          <ul className="mt-4 space-y-2">
            {certifications.map((item) => (
              <li key={item.name}>
                {item.name} — {item.year}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Languages</h2>
          <ul className="mt-4 space-y-1">
            {site.languages.map((item) => (
              <li key={item.name}>
                {item.name} — {item.detail}
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-ink-muted">
          Location: {site.location}. Email: {site.contact.email}.
        </p>
      </div>
    </Container>
  );
}
