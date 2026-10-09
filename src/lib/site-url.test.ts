import { afterEach, describe, expect, it } from "vitest";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

describe("site URL helpers", () => {
  afterEach(() => {
    delete process.env.SITE_URL;
  });

  it("returns undefined when SITE_URL is absent", () => {
    delete process.env.SITE_URL;
    expect(getSiteUrl()).toBeUndefined();
    expect(absoluteUrl("/about")).toBeUndefined();
  });

  it("strips a trailing slash and builds an absolute path", () => {
    process.env.SITE_URL = "https://example.test/";
    expect(getSiteUrl()).toBe("https://example.test");
    expect(absoluteUrl("/about")).toBe("https://example.test/about");
  });
});
