import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { projects } from "../../content/projects";

describe("ArchitectureDiagram", () => {
  it("renders ecommerce platform architecture diagram without errors", () => {
    const ecommerceProject = projects.find((p) => p.slug === "ecommerce-platform");
    expect(ecommerceProject?.architecture).toBeDefined();

    if (ecommerceProject?.architecture) {
      render(<ArchitectureDiagram architecture={ecommerceProject.architecture} />);

      // Verify layer titles
      expect(screen.getAllByText(/Client Layer/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Application Layer/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/External Services/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Data & Infrastructure Layer/i).length).toBeGreaterThan(0);

      // Verify key component labels
      expect(screen.getAllByText(/Browser \/ Next.js Frontend/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Express API/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/PostgreSQL/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Redis/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/SeaweedFS/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Omise Gateway/i).length).toBeGreaterThan(0);

      // Verify flow labels
      expect(screen.getAllByText(/Outbound Payment/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Webhook Callback/i).length).toBeGreaterThan(0);
    }
  });

  it("renders generic layered diagram for other projects", () => {
    const gymmate = projects.find((p) => p.slug === "gymmate");
    expect(gymmate?.architecture).toBeDefined();

    if (gymmate?.architecture) {
      render(<ArchitectureDiagram architecture={gymmate.architecture} />);

      expect(screen.getAllByText(/Presentation Tier/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/REST API/i).length).toBeGreaterThan(0);
    }
  });
});
