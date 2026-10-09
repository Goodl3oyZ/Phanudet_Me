import { render, screen } from "@testing-library/react";
import { DesktopNavigation } from "@/components/layout/DesktopNavigation";

vi.mock("next/navigation", () => ({
  usePathname: () => "/projects",
}));

describe("DesktopNavigation", () => {
  it("renders primary destinations and marks the active route", () => {
    render(<DesktopNavigation />);

    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Engineering Lab" })).toHaveAttribute("href", "/lab");
    expect(screen.getByRole("link", { name: "Notes" })).toHaveAttribute("href", "/notes");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
  });
});
