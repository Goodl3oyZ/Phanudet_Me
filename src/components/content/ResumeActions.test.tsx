import { render, screen } from "@testing-library/react";
import { ResumeActions } from "@/components/content/ResumeActions";
import { site } from "@/content/site";

describe("ResumeActions", () => {
  it("offers open and download actions when the PDF exists", () => {
    render(<ResumeActions pdfAvailable />);

    expect(screen.getByRole("link", { name: "Open PDF" })).toHaveAttribute("href", site.resumePdf.href);
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute(
      "download",
      site.resumePdf.filename,
    );
  });

  it("does not render broken download controls when the PDF is missing", () => {
    render(<ResumeActions pdfAvailable={false} />);

    expect(screen.queryByRole("link", { name: "Download PDF" })).not.toBeInTheDocument();
    expect(screen.getByText(/not in/i)).toBeInTheDocument();
  });
});
