import { notFound } from "next/navigation";
import { MarkdownBody } from "@/components/content/MarkdownBody";
import { TableOfContents } from "@/components/content/TableOfContents";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { getProjectBySlug } from "@/content/projects";
import { extractHeadings, getAllNotes, getNoteBySlug, getNoteSlugs } from "@/lib/notes";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) {
    return pageMetadata("Note not found", "No article matches this URL.", "/notes");
  }
  return pageMetadata(note.title, note.summary, `/notes/${note.slug}`);
}

export default async function NotePage({ params }: PageProps<"/notes/[slug]">) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) {
    notFound();
  }
  const headings = extractHeadings(note.body);
  const related = (note.relatedProjects ?? [])
    .map((item) => getProjectBySlug(item))
    .filter((item) => Boolean(item));
  const others = getAllNotes().filter((item) => item.slug !== note.slug).slice(0, 3);

  return (
    <Container>
      <PageHeader eyebrow={note.category} title={note.title} description={note.summary} />
      <p className="mb-8 text-sm text-ink-muted">Written {note.writtenOn}</p>
      <div className="grid min-w-0 gap-10 pb-16 lg:grid-cols-[minmax(0,45rem)_minmax(0,14rem)]">
        <article className="min-w-0 max-w-full overflow-x-auto">
          <MarkdownBody content={note.body} />
          {related.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-[1.75rem] font-semibold">Related projects</h2>
              <ul className="mt-4 space-y-2">
                {related.map((project) =>
                  project ? (
                    <li key={project.slug}>
                      <TextLink href={`/projects/${project.slug}`}>{project.title}</TextLink>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
          ) : null}
        </article>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents headings={headings} />
          {others.length > 0 ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
                Other notes
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {others.map((item) => (
                  <li key={item.slug}>
                    <TextLink href={`/notes/${item.slug}`}>{item.title}</TextLink>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </Container>
  );
}
