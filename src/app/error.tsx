"use client";

import { ErrorState } from "@/components/ui/ErrorState";
import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container>
      <ErrorState onRetry={reset} />
    </Container>
  );
}
