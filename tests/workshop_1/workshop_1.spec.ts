import { test } from "playwright/test";

test.describe("Workshop 1", () => {
  test("Basic Navigation", async ({ page }) => {
    // Navigate to GitLab
    await page.goto("https://gitlab.com/");
    // Wait for 3 seconds
    await page.waitForTimeout(3000);
    // Reload
    await page.reload();
  });

  test("Interacting with Web Element on Gitlab", async ({ page }) => {
    // Navigate to GitLab
    await page.goto("https://gitlab.com/");

    await page.locator('#be-navigation-desktop').getByRole('link', {name: 'Get free trial'}).click();
    // Method 1
    await page.locator('[data-testid="new-user-first-name-field"]').fill('John');
    await page.locator('[data-testid="new-user-last-name-field"]').fill('Smith');
    await page.locator('[id=new_user_username]').fill('jsmith');

    // Method 2
    await page.getByTestId('new-user-first-name-field').fill('Jane');
    await page.getByTestId('new-user-last-name-field').fill('Doe');
    await page.locator('[id=new_user_username]').fill('jdoe');
  });
  
  test.only("Using Various Locator Methods", async ({ page }) => {
    // Navigate to GitLab
    await page.goto("https://gitlab.com/");

    //await page.getByRole('button', {name: 'Main menu'}).click();
    // Click "Sign in"
    await page.getByRole('link', {name: 'Sign in'}).click();

    // Click "Sign in"
    // await page.click(':has-text("Sign in")');

    // Wait for 3 seconds
    await page.waitForTimeout(3000);

  });
});
