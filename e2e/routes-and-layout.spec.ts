import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/projects",
  "/projects/ecommerce-platform",
  "/projects/mlp-genetic-fuzzy",
  "/projects/homelab",
  "/projects/edverra",
  "/projects/skill-bridge",
  "/projects/restaurant-pos",
  "/projects/systems-embedded",
  "/about",
  "/lab",
  "/notes",
  "/notes/layered-commerce-api",
  "/notes/mlp-without-frameworks",
  "/notes/local-llm-resources",
  "/notes/compose-full-stack",
  "/resume",
  "/contact",
  "/privacy",
  "/healthz",
];

test("all public routes respond successfully", async ({ request }) => {
  for (const route of routes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
  }

  const pdf = await request.get("/resume/Phanudet_Resume_ENG.pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toMatch(/pdf/);

  const missing = await request.get("/projects/not-a-real-project");
  expect(missing.status()).toBe(404);
});

test("layouts do not overflow at representative widths", async ({ page }) => {
  const pages = ["/", "/projects", "/projects/ecommerce-platform", "/lab", "/notes", "/resume"];
  const widths = [375, 768, 1024, 1440];

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of pages) {
      await page.goto(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${route} at ${width}px`).toBeLessThanOrEqual(1);
    }
  }
});

test("skip link is reachable from the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
