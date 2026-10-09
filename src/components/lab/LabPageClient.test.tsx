import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { LabPageClient } from "./LabPageClient";
import { labExperiments } from "../../content/lab";

describe("LabPageClient", () => {
  it("renders page hero, architecture diagram, project grid, and principles", () => {
    render(<LabPageClient experiments={labExperiments} />);

    // Hero check
    expect(screen.getByRole("heading", { level: 1, name: "Engineering Lab" })).toBeInTheDocument();
    expect(screen.getByText(/LAB \/ HOMELAB & INFRASTRUCTURE/i)).toBeInTheDocument();

    // Topology section
    expect(screen.getByText("Lab Infrastructure Topology")).toBeInTheDocument();

    // Case studies grid
    expect(screen.getByText("Proxmox lab on reused hardware")).toBeInTheDocument();
    expect(screen.getByText("Dockerized self-hosted services")).toBeInTheDocument();
    expect(screen.getByText("Local AI workload experiments")).toBeInTheDocument();
    expect(screen.getByText("Linux troubleshooting practice")).toBeInTheDocument();

    // Engineering principles
    expect(screen.getByText("Lab Engineering Principles")).toBeInTheDocument();
    expect(screen.getByText("Isolation over convenience")).toBeInTheDocument();
    expect(screen.getByText("Reproducible configuration")).toBeInTheDocument();
    expect(screen.getByText("Diagnose before changing")).toBeInTheDocument();
    expect(screen.getByText("Document limitations honestly")).toBeInTheDocument();
  });

  it("expands and collapses case study details interactively", async () => {
    const user = userEvent.setup();
    render(<LabPageClient experiments={labExperiments} />);

    // Initially details should not be rendered
    expect(screen.queryByText("Hypervisor installed on the rebuilt host.")).not.toBeInTheDocument();

    // Click disclosure button for first card
    const toggleButtons = screen.getAllByRole("button", { name: /Read case study details/i });
    expect(toggleButtons.length).toBe(4);

    await user.click(toggleButtons[0]);

    // Now details should be expanded
    expect(screen.getByText("Hypervisor installed on the rebuilt host.")).toBeInTheDocument();

    // Click Expand All
    const expandAllBtn = screen.getByRole("button", { name: /Expand All Case Studies/i });
    await user.click(expandAllBtn);

    // Now details for all items should be expanded
    expect(screen.getByText("Hypervisor installed on the rebuilt host.")).toBeInTheDocument();

    // Now button text changes to Collapse All
    const collapseAllBtn = screen.getByRole("button", { name: /Collapse All Case Studies/i });
    await user.click(collapseAllBtn);

    expect(screen.queryByText("Hypervisor installed on the rebuilt host.")).not.toBeInTheDocument();
  });
});
