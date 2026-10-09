import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/TextLink";
import { certifications, site, skillGroups } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "About",
  "Computer Engineering graduate building software, exploring machine learning, and operating local infrastructure.",
  "/about",
);

export default function AboutPage() {
  return (
    <Container>
      <PageHeader eyebrow="About" title={site.owner} description={site.introduction} />
      <div className="max-w-[45rem] space-y-12 pb-16">
        <section>
          <h2 className="text-[1.75rem] font-semibold">Education</h2>
          <p className="mt-4">
            {site.education.degree}, {site.education.school}, {site.education.location}. GPA{" "}
            {site.education.gpa}.
          </p>
          <p className="mt-3 text-ink-muted">Based in {site.location}.</p>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Technical focus</h2>
          <p className="mt-4 text-ink-muted">
            Skills listed on the résumé, grouped by area. These are tools used in academic and
            personal work, not self-scored proficiency bars.
          </p>
          <dl className="mt-6 space-y-5">
            {skillGroups.map((group) => (
              <div key={group.label}>
                <dt className="font-medium">{group.label}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{group.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Certifications</h2>
          <ul className="mt-4 space-y-2">
            {certifications.map((item) => (
              <li key={item.name}>
                {item.name} — {item.year}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Selected project experience</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5">
            <li>
              Full-stack commerce platform with cart, payment, shipping, OAuth, and addresses —{" "}
              <TextLink href="/projects/ecommerce-platform">case study</TextLink>
            </li>
            <li>
              From-scratch MLP with genetic algorithms and fuzzy logic on WDBC —{" "}
              <TextLink href="/projects/mlp-genetic-fuzzy">case study</TextLink>
            </li>
            <li>
              HomeLab on reused hardware for virtualization, containers, and local AI —{" "}
              <TextLink href="/projects/homelab">case study</TextLink>
            </li>
            <li>
              Team lead for EdVerra system design; project owner for Skill Bridge; frontend on a
              restaurant POS —{" "}
              <TextLink href="/projects">team projects</TextLink>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-[1.75rem] font-semibold">Engineering philosophy</h2>
          <p className="mt-4">
            Prefer implementations that can be inspected: modules with clear boundaries, evaluation
            methods that are written down, and infrastructure that is documented without overstating
            what is in production. AI is a tool to evaluate, not a default architecture.
          </p>
        </section>

        <p>
          <TextLink href="/resume">Read the HTML résumé</TextLink>
          {" · "}
          <TextLink href="/contact">Contact</TextLink>
        </p>
      </div>
    </Container>
  );
}
