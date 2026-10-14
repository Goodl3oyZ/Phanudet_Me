import {
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  FileCheck2,
  Fingerprint,
  KeyRound,
  Laptop,
  type LucideIcon,
  Mic,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Connector, ZoneCard } from "@/components/diagrams/DiagramParts";

const PIPELINE: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: Fingerprint, title: "Sign-in", detail: "Google allow-list + paired device, CSRF, origin check" },
  { icon: Mic, title: "Speech to text", detail: "faster-whisper small, vocabulary prompt" },
  { icon: Sparkles, title: "Rules first", detail: "Aliases and shortcuts skip the LLM (~1 s)" },
  { icon: BrainCircuit, title: "LLM planner", detail: "Ollama gemma4-e2b on GPU, tool calling" },
  { icon: ShieldCheck, title: "Policy router", detail: "Deny by default, risk 0–4, confirm, rate limit" },
  { icon: KeyRound, title: "Sign & send", detail: "HMAC + timestamp + nonce to the PC agent" },
];

const SIDE: { icon: LucideIcon; title: string; detail: string }[] = [
  { icon: Cpu, title: "GTX 1650 SUPER 4 GB", detail: "GPU passthrough to the LXC" },
  { icon: Database, title: "SQLite (WAL)", detail: "Jobs, timings, hash-chained audit" },
  { icon: Cloud, title: "Open WebUI", detail: "Chat with the same local models" },
];

const PC2_CHECKS = [
  "Verify HMAC, reject replays",
  "Re-check the allowlist",
  "Run without a shell",
  "Verify the result",
  "Write the audit log",
];

const PC2_TOOLS = [
  "Apps on the allowlist",
  "Owner's Chrome via extension",
  "YouTube, music, volume",
  "OBS, Office, Steam",
  "AI coding on ai/* git branches",
  "Screenshot for the vision model",
];

/** System diagram for Voice PC Remote: phone → Cloudflare → PC1 (AI server) → PC2 (Windows agent). */
export function VoicePcDiagram() {
  return (
    <figure>
      <div
        role="img"
        aria-label="Voice PC Remote architecture: the phone app reaches PC1 through a Cloudflare Tunnel; PC1 signs in the user, transcribes speech, plans with rules or a local LLM, checks policy, and sends an HMAC-signed request to the agent on the Windows PC, which connects outward to PC1 and runs the tool after checking it again."
        className="rounded-2xl border border-line bg-surface p-3 sm:p-5"
      >
        <ZoneCard icon={Smartphone} title="Phone — PWA" where="React + TypeScript, installable, HTTPS microphone">
          <ul className="flex flex-wrap gap-2 text-xs">
            {["Tap or hold to talk", "Edit what it heard, then Send", "Hands-free wake word", "Confirm card", "Stop"].map(
              (item) => (
                <li key={item} className="rounded-lg border border-line bg-surface px-2.5 py-1">
                  {item}
                </li>
              ),
            )}
          </ul>
        </ZoneCard>

        <Connector label="HTTPS + WebSocket · Cloudflare Tunnel (no open ports)" />

        <ZoneCard icon={Route} title="PC1 — AI server" where="Proxmox LXC on the HomeLab · FastAPI service (systemd)">
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PIPELINE.map(({ icon: Icon, title, detail }, i) => (
              <li key={title} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background text-accent">
                  <Icon size={15} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">
                    <span className="mr-1 font-mono text-xs text-ink-muted">{i + 1}.</span>
                    {title}
                  </span>
                  <span className="block text-xs leading-5 text-ink-muted">{detail}</span>
                </span>
              </li>
            ))}
          </ol>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {SIDE.map(({ icon: Icon, title, detail }) => (
              <li key={title} className="flex items-start gap-2 rounded-xl border border-dashed border-line p-3">
                <Icon size={15} className="mt-0.5 shrink-0 text-ink-muted" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold">{title}</span>
                  <span className="block text-xs text-ink-muted">{detail}</span>
                </span>
              </li>
            ))}
          </ul>
        </ZoneCard>

        <Connector label="Signed request · relayed over the agent's outbound WebSocket" />

        <ZoneCard icon={Laptop} title="PC2 — Windows agent" where="Dials out to PC1 · secret in Windows Credential Manager">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                <FileCheck2 size={13} aria-hidden /> Checks again
              </p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {PC2_CHECKS.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">Then acts</p>
              <ul className="mt-2 flex flex-wrap gap-2 text-xs">
                {PC2_TOOLS.map((item) => (
                  <li key={item} className="rounded-lg border border-line bg-surface px-2.5 py-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ZoneCard>
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted">
        Nothing listens on the internet directly: the phone and the PC agent both reach PC1 through Cloudflare Tunnel, and
        Ollama and Open WebUI bind to localhost. The LLM is treated as untrusted — its output only proposes a tool call,
        which the policy router and then the PC agent check before anything runs.
      </figcaption>
    </figure>
  );
}
