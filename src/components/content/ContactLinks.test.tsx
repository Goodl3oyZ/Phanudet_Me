import { render, screen } from "@testing-library/react";
import { ContactLinks } from "@/components/content/ContactLinks";
import { site } from "@/content/site";

describe("ContactLinks", () => {
  it("exposes verified email, GitHub and LinkedIn destinations", () => {
    render(<ContactLinks />);

    expect(screen.getByRole("link", { name: new RegExp(site.contact.email) })).toHaveAttribute(
      "href",
      `mailto:${site.contact.email}`,
    );
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      site.contact.github.href,
    );
    // LinkedIn URL taken from the résumé PDF's own hyperlink.
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      site.contact.linkedin.href,
    );
  });
});
