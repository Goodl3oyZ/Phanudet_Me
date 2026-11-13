import Link from "next/link";
import { site } from "@/content/site";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/80 bg-background">
      <Container className="relative flex h-[var(--header-height)] items-center justify-between gap-3">
        <Link
          href="/"
          className="truncate font-mono text-[13px] font-semibold tracking-[0.14em] text-ink md:text-sm md:tracking-[0.08em]"
        >
          {site.brand}
        </Link>
        <DesktopNavigation />
        <div className="hidden md:block">
          <PrimaryButton href="/contact">Contact</PrimaryButton>
        </div>
        <MobileNavigation />
      </Container>
    </header>
  );
}
