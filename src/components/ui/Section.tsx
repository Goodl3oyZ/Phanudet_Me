import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  tone?: "default" | "surface";
  narrow?: boolean;
};

export function Section({
  children,
  id,
  className = "",
  tone = "default",
  narrow,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 ${tone === "surface" ? "bg-surface" : "bg-background"} ${className}`}
    >
      <Container narrow={narrow}>{children}</Container>
    </section>
  );
}
