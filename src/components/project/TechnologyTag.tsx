export function TechnologyTag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-muted px-2.5 py-1 text-xs text-ink">
      {label}
    </span>
  );
}
