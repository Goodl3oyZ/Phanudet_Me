import { Container } from "@/components/ui/Container";
import { labExperiments } from "@/content/lab";
import { LabPageClient } from "@/components/lab/LabPageClient";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Engineering Lab",
  "Documented homelab, container, local AI, and Linux experiments. No live metrics and no private network detail.",
  "/lab",
);

export default function LabPage() {
  return (
    <Container>
      <LabPageClient experiments={labExperiments} />
    </Container>
  );
}
