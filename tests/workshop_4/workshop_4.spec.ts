import { test, expect } from "playwright/test";
import path from "path";

test.describe("Workshop 4", () => {
  test("Handling Alerts", async ({ page }) => {
    // Use relative path instead of absolute path
    const filePath = path.join(__dirname, "index.html");
    await page.goto(`file://${filePath}`);

    let alertMessage = "";

    page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("alert");
      alertMessage = await dialog.message();
      await page.waitForTimeout(2000);
      await dialog.accept();
    });

    await page.click("#show-alert");

    await page.waitForTimeout(2000);
    expect(alertMessage).toContain("This is a simple alert.");
  });

  test("Handling Confirm Alerts", async ({ page }) => {
    // Use relative path instead of absolute path
    const filePath = path.join(__dirname, "index.html");
    await page.goto(`file://${filePath}`);

    let alertMessage = "";
    let confirmMessage = "";

    page.on("dialog", async (dialog) => {
      if (dialog.type() === "alert") {
        alertMessage = dialog.message();
        await page.waitForTimeout(2000);
        await dialog.accept();
      } else if (dialog.type() === "confirm") {
        confirmMessage = dialog.message();
        await page.waitForTimeout(2000);
        await dialog.dismiss();
      }
    });

    await page.waitForTimeout(2000);
    await page.click("#show-confirm");
    await page.waitForTimeout(2000);
    expect(confirmMessage).toContain("Are you sure you want to proceed?");
    expect(alertMessage).toContain("You clicked Cancel.");
  });

  test("Handling Pop-up Windows", async ({ page }) => {
    // Use relative path instead of absolute path
    const filePath = path.join(__dirname, "index.html");
    await page.goto(`file://${filePath}`);

    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.click("#open-popup"),
    ]);

    await popup.waitForLoadState("load");
    expect(popup.url()).toContain("https://example.com");

    await page.waitForTimeout(2000);

    await popup.close();

    await page.waitForTimeout(2000);
    
  });
});
