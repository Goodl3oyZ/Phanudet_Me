import { ContactLinks } from "@/components/content/ContactLinks";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contact",
  "Verified email and GitHub profile for Phanudet Sueaphueak.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        description="Only destinations that could be verified from the résumé and public GitHub profile are listed. There is no message form on this site because there is no mail backend."
      />
      <div className="max-w-[45rem] pb-16">
        <ContactLinks />
        <p className="mt-8 text-sm text-ink-muted">
          LinkedIn appears as a label on the résumé PDF, but a durable public URL was not confirmed
          at implementation time, so it is omitted rather than guessed.
        </p>
        <p className="mt-4 text-sm text-ink-muted">Based in {site.location}.</p>
      </div>
    </Container>
  );
}
