type Heading = { id: string; text: string };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Table of contents" className="rounded-2xl border border-line bg-muted p-5">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
        On this page
      </p>
      <ol className="mt-3 space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="text-ink hover:text-accent">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
