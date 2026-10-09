import { describe, expect, it } from "vitest";
import { pageMetadata } from "@/lib/metadata";

describe("pageMetadata", () => {
  it("sets title and description", () => {
    const metadata = pageMetadata("About", "A short description", "/about");
    expect(metadata.title).toBe("About");
    expect(metadata.description).toBe("A short description");
  });

  it("omits canonical URLs without SITE_URL", () => {
    delete process.env.SITE_URL;
    const metadata = pageMetadata("Home", "Hello", "/");
    expect(metadata.alternates?.canonical).toBeUndefined();
  });
});
