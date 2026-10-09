import type { EvidenceLink as Evidence } from "@/content/types";
import { EvidenceLink } from "@/components/project/EvidenceLink";

export function EvidencePanel({ items }: { items: Evidence[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.href} className="text-sm">
          <span className="mr-2 font-mono text-xs uppercase text-ink-muted">
            {item.type}
          </span>
          <EvidenceLink evidence={item} />
        </li>
      ))}
    </ul>
  );
}
