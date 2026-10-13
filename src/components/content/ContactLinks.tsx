import { BriefcaseBusiness, GitFork, Mail } from "lucide-react";
import { site } from "@/content/site";

export function ContactLinks() {
  const items = [
    {
      href: `mailto:${site.contact.email}`,
      label: site.contact.email,
      detail: "Email",
      icon: Mail,
      external: false,
    },
    {
      href: site.contact.github.href,
      label: site.contact.github.label,
      detail: "Code and public repositories",
      icon: GitFork,
      external: true,
    },
    {
      href: site.contact.linkedin.href,
      label: site.contact.linkedin.label,
      detail: "Experience and recommendations",
      icon: BriefcaseBusiness,
      external: true,
    },
  ];

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-background px-4 py-3 hover:bg-muted"
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon size={18} aria-hidden className="text-accent" />
              <span>
                <span className="block text-sm font-medium">{item.label}</span>
                <span className="block text-xs text-ink-muted">{item.detail}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
