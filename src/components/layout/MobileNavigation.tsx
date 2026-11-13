"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems } from "@/content/site";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-muted"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} strokeWidth={1.75} aria-hidden /> : <Menu size={22} strokeWidth={1.75} aria-hidden />}
      </button>
      {open ? (
        <div
          id={panelId}
          className="fixed inset-x-0 top-[var(--header-height)] bottom-0 z-40 overflow-y-auto bg-background"
        >
          <nav aria-label="Mobile" className="flex min-h-full flex-col px-5 pb-8 pt-4">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`flex min-h-14 items-center border-b border-line text-[1.05rem] ${
                        active ? "font-semibold text-ink" : "font-medium text-ink"
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href="/contact"
              onClick={close}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-5 text-sm font-medium text-white"
            >
              Contact
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
