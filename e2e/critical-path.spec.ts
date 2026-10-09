import { expect, test } from "@playwright/test";

test("homepage to project case study to résumé", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Building software. Understanding systems." })).toBeVisible();

  await page.getByRole("link", { name: "Explore Projects" }).click();
  await expect(page.getByRole("heading", { name: "Selected Engineering Work" })).toBeVisible();

  await page.getByRole("button", { name: "AI / ML" }).click();
  await page.getByRole("link", { name: "MLP, Genetic Algorithm, and Fuzzy Logic" }).first().click();
  await expect(page.getByRole("heading", { name: "MLP, Genetic Algorithm, and Fuzzy Logic" })).toBeVisible();

  await page.getByRole("link", { name: "Back to all projects" }).click();
  await expect(page.getByRole("heading", { name: "Selected Engineering Work" })).toBeVisible();

  await page.goto("/resume");
  await expect(page.getByRole("heading", { name: "Phanudet Sueaphueak" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open PDF" })).toBeVisible();
});

test("invalid project slug shows a recovery path", async ({ page }) => {
  await page.goto("/projects/not-a-real-project");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  await expect(page.locator("#main").getByRole("link", { name: "Projects" })).toBeVisible();
});

test("contact page only lists verified destinations", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.getByRole("link", { name: /flukephanudet\.work@gmail\.com/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /GitHub/ })).toBeVisible();
});

test("mobile navigation opens and reaches About", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "About" }).click();
  await expect(page.getByRole("heading", { name: "Phanudet Sueaphueak" })).toBeVisible();
});
