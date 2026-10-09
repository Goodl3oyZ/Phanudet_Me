import type { Project } from "@/content/types";

export function ProjectMetadata({ project }: { project: Project }) {
  const items = [
    { label: "Category", value: project.category },
    { label: "Status", value: project.status },
    { label: "Role", value: project.role },
  ];

  return (
    <dl className="grid gap-4 rounded-2xl border border-line bg-muted p-5 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="font-mono text-xs uppercase tracking-[0.12em] text-ink-muted">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
