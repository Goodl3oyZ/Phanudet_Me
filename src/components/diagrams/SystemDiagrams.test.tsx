import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeLabDiagram } from "./HomeLabDiagram";
import { VoicePcDiagram } from "./VoicePcDiagram";
import { projects } from "../../content/projects";

describe("system diagrams", () => {
  it("draws the Voice PC path from phone to the Windows agent", () => {
    render(<VoicePcDiagram />);
    expect(screen.getByRole("img", { name: /Voice PC Remote architecture/i })).toBeInTheDocument();
    for (const zone of ["Phone — PWA", "PC1 — AI server", "PC2 — Windows agent"]) {
      expect(screen.getByText(zone)).toBeInTheDocument();
    }
  });

  it("draws the HomeLab stacks behind the tunnel", () => {
    render(<HomeLabDiagram />);
    expect(screen.getByRole("img", { name: /HomeLab architecture/i })).toBeInTheDocument();
    for (const stack of ["Cloudflare", "Proxmox VE host", "E-commerce", "Local AI", "Monitoring"]) {
      expect(screen.getByText(stack)).toBeInTheDocument();
    }
  });

  it("is used only by projects that have one", () => {
    const custom = projects.filter((p) => p.customDiagram).map((p) => [p.slug, p.customDiagram]);
    expect(custom).toEqual([
      ["voice-pc-remote", "voice-pc-remote"],
      ["homelab", "homelab"],
    ]);
  });
});
