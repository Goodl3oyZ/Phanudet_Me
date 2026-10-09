import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Privacy",
  "This static engineering portfolio does not run analytics or a contact form.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Privacy"
        title="Privacy"
        description="What this website does and does not collect."
      />
      <div className="max-w-[45rem] space-y-6 pb-16">
        <p>
          This site is a static engineering portfolio. It does not include analytics, advertising
          pixels, authentication, or a contact form.
        </p>
        <p>
          Pages are HTML, CSS, and JavaScript delivered by the web server or CDN you configure. The
          server or hosting provider may keep ordinary access logs (IP address, user agent, requested
          path). Those logs are not processed by this application.
        </p>
        <p>
          The contact page links to email and GitHub. Following those links is subject to the
          privacy practices of your email client and of GitHub.
        </p>
        <p>
          If a <code>SITE_URL</code> environment variable is set at build time, it is used only for
          canonical URLs, Open Graph metadata, sitemap, and robots. It is not used to track visitors.
        </p>
        <p>
          Questions: {site.contact.email}.
        </p>
      </div>
    </Container>
  );
}
