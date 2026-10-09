import { site } from "@/content/site";

const primary =
  "inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white hover:bg-accent-hover";
const secondary =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-background px-5 text-sm font-medium text-ink hover:bg-muted";

export function ResumeActions({ pdfAvailable }: { pdfAvailable: boolean }) {
  if (!pdfAvailable) {
    return (
      <p className="rounded-xl border border-line bg-muted px-4 py-3 text-sm text-ink-muted">
        A PDF résumé file is not in <code>public/resume/</code> yet. The HTML résumé below remains
        the source of verified facts.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <a
        className={primary}
        href={site.resumePdf.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open PDF
      </a>
      <a className={secondary} href={site.resumePdf.href} download={site.resumePdf.filename}>
        Download PDF
      </a>
    </div>
  );
}
