import type { EvidenceLink as Evidence } from "@/content/types";

export function EvidenceLink({ evidence }: { evidence: Evidence }) {
  return (
    <a
      href={evidence.href}
      className="font-medium text-accent underline-offset-4 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {evidence.label}
    </a>
  );
}
