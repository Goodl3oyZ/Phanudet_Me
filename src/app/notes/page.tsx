import { ArticleCard } from "@/components/content/ArticleCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllNotes } from "@/lib/notes";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Engineering Notes",
  "Short technical notes on architecture, Docker, machine learning implementations, and local AI.",
  "/notes",
);

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <Container>
      <PageHeader
        eyebrow="Notes"
        title="Engineering Notes"
        description="Articles written for this site. Dates are write dates, not a publication history with traffic statistics."
      />
      <div className="pb-16">
        {notes.length === 0 ? (
          <EmptyState
            title="No notes yet"
            body="Notes will appear here when markdown files are added under src/content/notes."
          />
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {notes.map((note) => (
              <li key={note.slug}>
                <ArticleCard note={note} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
}
