import Link from "next/link";
import { footerNav, navItems, site } from "@/content/site";
import { Container } from "@/components/ui/Container";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-muted">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-mono text-sm font-semibold tracking-[0.08em]">
            {site.brand}
          </p>
          <p className="mt-2 max-w-sm text-sm text-ink-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink hover:text-accent">
              {item.label}
            </Link>
          ))}
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
