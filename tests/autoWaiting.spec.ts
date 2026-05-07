import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.URL as string);
  await page.getByText("Button Triggering AJAX Request").click();
});

test("auto waitng", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  //await successButton.click();

  //const text = await successButton.textContent();
  //await successButton.waitFor({ state: "attached" });
  //const text = await successButton.allTextContents();

  //expect(text).toContain("Data loaded with AJAX get request.");
  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test.skip("alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  //1. __wait for element
  //await page.waitForSelector(".bg-success");

  //2. __wait for particular response
  //await page.waitForResponse("http://uitestingplayground.com/ajax");

  //3. __wait for network calls to be completed (not recommended)
  await page.waitForLoadState("networkidle");

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test.skip("timeouts", async ({ page }) => {
  const successButton = page.locator("bg-success");
  await successButton.click();
});
