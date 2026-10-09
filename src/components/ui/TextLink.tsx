import Link from "next/link";
import type { ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
};

export function TextLink({ href, children, external, className = "" }: TextLinkProps) {
  const classes = `font-medium text-accent underline-offset-4 transition-colors hover:underline ${className}`;
  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
