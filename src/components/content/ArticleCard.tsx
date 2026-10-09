import Link from "next/link";
import type { Note } from "@/lib/notes";

export function ArticleCard({ note }: { note: Note }) {
  return (
    <article className="rounded-2xl border border-line bg-background p-6">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
        {note.category}
      </p>
      <h2 className="mt-2 text-xl font-semibold tracking-tight">
        <Link href={`/notes/${note.slug}`} className="hover:text-accent">
          {note.title}
        </Link>
      </h2>
      <p className="mt-3 text-sm text-ink-muted">{note.summary}</p>
      <p className="mt-4 text-xs text-ink-muted">Written {note.writtenOn}</p>
    </article>
  );
}
