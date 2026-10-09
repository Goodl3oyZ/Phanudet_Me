"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/content/site";

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
      {navItems.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-2 text-sm transition-colors ${
              active
                ? "bg-muted font-medium text-ink"
                : "text-ink-muted hover:bg-muted hover:text-ink"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
