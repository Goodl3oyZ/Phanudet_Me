import { Activity, BrainCircuit, Cloud, Globe, type LucideIcon, Server, ShoppingBag, UserRound } from "lucide-react";
import { Connector, ZoneCard } from "@/components/diagrams/DiagramParts";

const HOSTNAMES = [
  "shop.flukelnwza.online",
  "pc.flukelnwza.online",
  "chat.flukelnwza.online",
  "flukelnwza.online",
  "grafana · logs (owner)",
];

const STACKS: { icon: LucideIcon; title: string; detail: string; services: string[] }[] = [
  {
    icon: ShoppingBag,
    title: "E-commerce",
    detail: "Docker Compose · deployed by GitHub Actions through a signed webhook",
    services: ["Caddy", "Next.js", "Express API", "PostgreSQL", "Redis", "SeaweedFS (S3)"],
  },
  {
    icon: BrainCircuit,
    title: "Local AI",
    detail: "GPU passed through to the container",
    services: ["Ollama · gemma4-e2b", "Open WebUI", "Voice PC orchestrator (systemd)"],
  },
  {
    icon: Activity,
    title: "Monitoring",
    detail: "Metrics and logs for every container",
    services: ["Prometheus", "nvidia GPU exporter", "Grafana", "Dozzle"],
  },
  {
    icon: UserRound,
    title: "Portfolio",
    detail: "This site",
    services: ["Next.js (Docker)"],
  },
];

/** HomeLab topology: visitors → Cloudflare Tunnel → Proxmox host → one LXC running the live stacks. */
export function HomeLabDiagram() {
  return (
    <figure>
      <div
        role="img"
        aria-label="HomeLab architecture: visitors reach Cloudflare, which forwards each hostname through an outbound tunnel to a Proxmox host. One Linux container with the GPU passed through runs the e-commerce stack, the local AI stack, monitoring, and this portfolio in Docker."
        className="rounded-2xl border border-line bg-surface p-3 sm:p-5"
      >
        <ZoneCard icon={Globe} title="Visitors and me" where="Browsers and phones on the internet">
          <ul className="flex flex-wrap gap-2 font-mono text-[11px]">
            {HOSTNAMES.map((host) => (
              <li key={host} className="rounded-lg border border-line bg-surface px-2.5 py-1">
                {host}
              </li>
            ))}
          </ul>
        </ZoneCard>

        <Connector label="HTTPS" />

        <ZoneCard icon={Cloud} title="Cloudflare" where="DNS, TLS, and a tunnel per hostname">
          <p className="text-sm text-ink-muted">
            <code className="font-mono text-xs">cloudflared</code> on the host dials out to Cloudflare, so the home
            network opens no inbound ports and needs no public IP.
          </p>
        </ZoneCard>

        <Connector label="Outbound tunnel → localhost ports" />

        <ZoneCard
          icon={Server}
          title="Proxmox VE host"
          where="Reused PC · GTX 1650 SUPER 4 GB · LXC 102 “ai-lxc” with GPU passthrough and Docker"
        >
          <ul className="grid gap-3 sm:grid-cols-2">
            {STACKS.map(({ icon: Icon, title, detail, services }) => (
              <li key={title} className="rounded-xl border border-line bg-surface p-3">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <Icon size={15} className="text-accent" aria-hidden />
                  {title}
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">{detail}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5 text-xs">
                  {services.map((service) => (
                    <li key={service} className="rounded-md border border-line bg-background px-2 py-0.5">
                      {service}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </ZoneCard>
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted">
        Nothing is port-forwarded on the router: every public hostname arrives through the tunnel. The e-commerce stack,
        Ollama, and Open WebUI bind to localhost or a private Docker network, and Proxmox is reachable only on the home
        network.
      </figcaption>
    </figure>
  );
}
