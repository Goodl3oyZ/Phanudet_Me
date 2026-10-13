import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectFilters } from "@/components/project/ProjectFilters";
import { projects } from "@/content/projects";

describe("ProjectFilters", () => {
  it("filters the grid when a category is pressed", async () => {
    const user = userEvent.setup();
    render(<ProjectFilters projects={projects} />);

    expect(screen.getByRole("link", { name: "E-Commerce Platform" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "AI / ML" }));

    expect(screen.getByRole("link", { name: "MLP, Genetic Algorithm, and Fuzzy Logic" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Restaurant POS" })).not.toBeInTheDocument();
  });

  it("shows an empty state when the filter matches nothing", async () => {
    const user = userEvent.setup();
    const noInfrastructure = projects.filter((project) => !project.filters.includes("Infrastructure"));
    render(<ProjectFilters projects={noInfrastructure} />);

    await user.click(screen.getByRole("button", { name: "Infrastructure" }));

    expect(screen.getByText("No projects in this category")).toBeInTheDocument();
  });
});
