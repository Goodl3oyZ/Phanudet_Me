"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navItems, site } from "@/content/site";
import { IconButton } from "@/components/ui/IconButton";

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
      <IconButton
        label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
      </IconButton>
      {open ? (
        <div
          id={panelId}
          className="absolute inset-x-0 top-full z-40 border-b border-line bg-background shadow-sm"
        >
          <nav aria-label="Mobile" className="flex flex-col px-5 py-4">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`min-h-11 rounded-lg px-3 py-3 text-base ${
                    active ? "bg-muted font-medium" : "text-ink"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={close}
              className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-accent px-5 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Contact
            </Link>
            <p className="mt-4 px-3 text-xs text-ink-muted">{site.brand}</p>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
