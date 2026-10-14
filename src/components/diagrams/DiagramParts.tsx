import type { ReactNode } from "react";
import { ArrowDown, type LucideIcon } from "lucide-react";

/** Building blocks for the hand-drawn system diagrams. */
export type Zone = {
  icon: LucideIcon;
  title: string;
  where: string;
  children: ReactNode;
};

export function ZoneCard({ icon: Icon, title, where, children }: Zone) {
  return (
    <div className="rounded-2xl border border-line bg-background p-4 shadow-[0_1px_2px_rgba(23,33,43,0.04)] sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
          <Icon size={20} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-semibold leading-tight">{title}</p>
          <p className="text-xs text-ink-muted">{where}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-1.5" aria-hidden>
      <span className="h-3 w-px bg-ink-muted/40" />
      <span className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] text-ink-muted">
        {label}
      </span>
      <ArrowDown size={16} className="text-ink-muted/70" />
    </div>
  );
}
