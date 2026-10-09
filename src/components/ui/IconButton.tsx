import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  children: ReactNode;
};

export function IconButton({ label, children, className = "", ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-background text-ink transition-colors hover:bg-muted ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
