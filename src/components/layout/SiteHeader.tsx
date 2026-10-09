import Link from "next/link";
import { site } from "@/content/site";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Container } from "@/components/ui/Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-sm">
      <Container className="relative flex min-h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-[0.08em] text-ink"
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
