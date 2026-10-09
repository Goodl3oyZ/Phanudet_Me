import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const classes =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-line bg-background px-5 text-sm font-medium text-ink transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50";

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

type ActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;
  children: ReactNode;
};

export function SecondaryButton(props: LinkProps | ActionProps) {
  const className = `${classes} ${props.className ?? ""}`;
  if (props.href) {
    const { href, children } = props;
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  const { children, ...buttonProps } = props;
  return (
    <button {...buttonProps} className={className}>
      {children}
    </button>
  );
}
