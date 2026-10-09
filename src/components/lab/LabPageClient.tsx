"use client";

import { useState } from "react";
import type { LabExperiment } from "@/content/types";
import { LabOverviewDiagram } from "./LabOverviewDiagram";
import {
  DockerVisual,
  LinuxTroubleshootingVisual,
  LocalAIVisual,
  ProxmoxVisual,
} from "./LabProjectVisuals";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  FileCheck,
  HardDrive,
  Layers,
  ListChecks,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";

export function LabPageClient({ experiments }: { experiments: LabExperiment[] }) {
  // Track open state for each experiment card
  const [expandedSlugs, setExpandedSlugs] = useState<Record<string, boolean>>({});

  const toggleExpand = (slug: string) => {
    setExpandedSlugs((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    experiments.forEach((exp) => {
      allOpen[exp.slug] = true;
    });
    setExpandedSlugs(allOpen);
  };

  const collapseAll = () => {
    setExpandedSlugs({});
  };

  const areAllExpanded =
    experiments.length > 0 && experiments.every((exp) => expandedSlugs[exp.slug]);

  return (
    <div className="space-y-16 pb-20 pt-2">
      {/* A. Compact Page Introduction (Hero Section) */}
      <section className="rounded-3xl border border-line bg-gradient-to-br from-surface via-background to-surface p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading & Introduction */}
          <div className="lg:col-span-7">
            <span className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">
              LAB / HOMELAB & INFRASTRUCTURE
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
              Engineering Lab
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
              Practical experiments in virtualization, multi-container stacks, local model serving, and Linux systems troubleshooting on personal hardware. Built to understand system layers, resource limits, and real-world failure modes.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-700">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 shadow-2xs">
                <Layers className="h-3.5 w-3.5 text-slate-700" /> 4 Case Studies
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 shadow-2xs">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" /> Sanitized Topology
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1 shadow-2xs">
                <FileCheck className="h-3.5 w-3.5 text-blue-700" /> Zero Live Metrics Claimed
              </span>
            </div>
          </div>

          {/* Right Column: Hero Architecture Illustration */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-xs font-bold text-ink">Personal Lab Stack</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                  Self-Hosted
                </span>
              </div>
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between rounded-lg border border-line bg-surface p-2.5">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-slate-700" />
                    <div>
                      <p className="font-semibold text-ink">Proxmox VE Host</p>
                      <p className="text-[10.5px] text-ink-muted">Type-1 Hypervisor</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">Physical PC</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-line bg-surface p-2.5">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-purple-700" />
                    <div>
                      <p className="font-semibold text-ink">Local AI Runtime</p>
                      <p className="text-[10.5px] text-ink-muted">Ollama & Open WebUI</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">VRAM / RAM</span>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-line bg-surface p-2.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-700" />
                    <div>
                      <p className="font-semibold text-ink">Linux CLI Diagnostics</p>
                      <p className="text-[10.5px] text-ink-muted">Logs & Process State</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">Systemd / CLI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Visual Lab Architecture Section */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Lab Infrastructure Topology
          </h2>
          <p className="mt-1.5 text-sm text-ink-muted">
            A layered breakdown of physical hardware, hypervisor control, guest virtual workloads, container stacks, and private networking.
          </p>
        </div>
        <LabOverviewDiagram />
      </section>

      {/* C. Lab Projects Overview (2-Column Grid with Expansion) */}
      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              EXPERIMENTS & CASE STUDIES
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Engineering Case Studies
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Select a case study to inspect objective, constraints, verification criteria, and limitations.
            </p>
          </div>
          <button
            onClick={areAllExpanded ? collapseAll : expandAll}
            className="self-start rounded-lg border border-line bg-background px-3.5 py-2 text-xs font-semibold text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-accent sm:self-auto"
          >
            {areAllExpanded ? "Collapse All Case Studies" : "Expand All Case Studies"}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {experiments.map((exp) => {
            const isExpanded = Boolean(expandedSlugs[exp.slug]);

            return (
              <article
                key={exp.slug}
                id={exp.slug}
                className="scroll-mt-24 flex flex-col justify-between rounded-2xl border border-line bg-background p-5 shadow-xs transition-all duration-200 hover:border-slate-300 md:p-6"
              >
                <div>
                  {/* Visual Diagram Panel */}
                  <div className="mb-4">
                    {exp.slug === "proxmox-homelab" && <ProxmoxVisual />}
                    {exp.slug === "docker-services" && <DockerVisual />}
                    {exp.slug === "local-ai" && <LocalAIVisual />}
                    {exp.slug === "linux-troubleshooting" && <LinuxTroubleshootingVisual />}
                  </div>

                  {/* Category & Title */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {exp.category || "LAB EXPERIMENT"}
                  </span>
                  <h3 className="mt-1 text-xl font-bold tracking-tight text-ink">{exp.title}</h3>

                  {/* Summary */}
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{exp.summary}</p>

                  {/* Technology Tags */}
                  {exp.technologies && exp.technologies.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line/60 bg-surface px-2 py-0.5 text-[11px] font-medium text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Engineering Focus */}
                  {exp.engineeringFocus ? (
                    <p className="mt-3.5 text-xs text-ink">
                      <span className="font-semibold text-slate-900">Engineering focus:</span>{" "}
                      <span className="text-ink-muted">{exp.engineeringFocus}</span>
                    </p>
                  ) : null}
                </div>

                {/* Disclosure Button */}
                <div className="mt-5 border-t border-line/70 pt-4">
                  <button
                    onClick={() => toggleExpand(exp.slug)}
                    aria-expanded={isExpanded}
                    aria-controls={`details-${exp.slug}`}
                    className="flex w-full items-center justify-between rounded-lg bg-surface px-4 py-2.5 text-xs font-semibold text-ink transition-colors hover:bg-slate-200/70 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span>{isExpanded ? "Hide case study details" : "Read case study details"}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-ink-muted" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-ink-muted" />
                    )}
                  </button>

                  {/* D. Expandable Technical Case Study Detail */}
                  {isExpanded ? (
                    <div
                      id={`details-${exp.slug}`}
                      className="mt-4 space-y-5 rounded-xl border border-line/80 bg-surface/50 p-4 text-xs text-ink md:p-5"
                    >
                      {/* Objective */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-900">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" /> Objective
                        </h4>
                        <p className="mt-1.5 leading-relaxed text-ink-muted">{exp.objective}</p>
                      </div>

                      {/* Architecture */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-900">
                          <Server className="h-3.5 w-3.5 text-slate-700" /> Architecture & Topology
                        </h4>
                        <p className="mt-1.5 leading-relaxed text-ink-muted">{exp.architecture}</p>
                      </div>

                      {/* Components */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-900">
                          <HardDrive className="h-3.5 w-3.5 text-blue-700" /> Components
                        </h4>
                        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                          {exp.components.map((comp) => (
                            <li
                              key={comp}
                              className="rounded-md border border-line bg-white px-2.5 py-1.5 font-medium text-slate-800"
                            >
                              • {comp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Configuration & Implementation */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-900">
                          <ListChecks className="h-3.5 w-3.5 text-slate-700" /> Configuration Summary
                        </h4>
                        <ul className="mt-1.5 space-y-1.5 pl-4 text-ink-muted">
                          {exp.configuration.map((cfg) => (
                            <li key={cfg} className="list-disc leading-relaxed">
                              {cfg}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Constraints & Trade-offs */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-amber-900">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-700" /> Constraints & Trade-offs
                        </h4>
                        <ul className="mt-1.5 space-y-1.5 pl-4 text-amber-950">
                          {exp.constraints.map((c) => (
                            <li key={c} className="list-disc leading-relaxed">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Verification */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-900">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" /> Verification Criteria
                        </h4>
                        <ul className="mt-1.5 space-y-1.5 pl-4 text-emerald-950">
                          {exp.verification.map((v) => (
                            <li key={v} className="list-disc leading-relaxed">
                              {v}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Known Limitations */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-900">
                          Known Limitations
                        </h4>
                        <ul className="mt-1.5 space-y-1.5 pl-4 text-ink-muted">
                          {exp.limitations.map((l) => (
                            <li key={l} className="list-disc leading-relaxed">
                              {l}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Evidence & References */}
                      <div>
                        <h4 className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-900">
                          Evidence & References
                        </h4>
                        <ul className="mt-1.5 space-y-1.5 pl-4 text-ink-muted">
                          {exp.evidence.map((ev) => (
                            <li key={ev} className="list-disc leading-relaxed">
                              {ev}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* E. Compact Engineering Principles Section */}
      <section className="rounded-3xl border border-line bg-surface p-6 md:p-10">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-muted">
            OPERATIONAL METHODOLOGY
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Lab Engineering Principles
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Core practices derived from building, troubleshooting, and documenting self-hosted infrastructure.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              01 / ISOLATION
            </span>
            <h3 className="mt-2 text-base font-bold text-ink">Isolation over convenience</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Run experiments inside dedicated virtual machines and containers so misconfigurations can be snapshotted, discarded, and rebuilt without corrupting the host OS.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
              02 / REPRODUCIBILITY
            </span>
            <h3 className="mt-2 text-base font-bold text-ink">Reproducible configuration</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Declare infrastructure and service dependencies in version-controlled Compose files using explicit service hostnames rather than developer localhost assumptions.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-800">
              03 / DIAGNOSTICS
            </span>
            <h3 className="mt-2 text-base font-bold text-ink">Diagnose before changing</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Inspect system logs, process states, and network socket bindings before modifying code or restarting services to understand the underlying failure mode.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-white p-5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
              04 / TRANSPARENCY
            </span>
            <h3 className="mt-2 text-base font-bold text-ink">Document limitations honestly</h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              Acknowledge hardware boundaries, single-point-of-failure risks, and sanitized parameters without fabricating live metrics or cloud production claims.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
