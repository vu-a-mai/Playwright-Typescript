import { expect, test } from "playwright/test";

test.describe("Workshop 9", () => {
    test("Automating Form Submissions @githubAction", async ({ page }) => {
        await page.goto("https://demo.playwright.dev/todomvc");

        const newTodo = await page.getByPlaceholder("What needs to be done?");
        await newTodo.fill("Buy milk");
        await page.keyboard.press("Enter");
        await newTodo.fill("Buy bread");
        await page.keyboard.press("Enter");

        const firstTodo = page.getByTestId('todo-item').nth(0);
        await firstTodo.getByRole('checkbox').check();
        const secondTodo = page.getByTestId('todo-item').nth(1);
        await expect(firstTodo).toHaveClass('completed');
        await expect(secondTodo).not.toHaveClass('completed');


        await page.waitForTimeout(2000);
    });

    test("Handling Form @githubAction", async ({ page }) => {
        await page.goto("https://demo.playwright.dev/todomvc");
        await page.fill('[placeholder="What needs to be done?"]', "Buy milk");
        await page.locator('[placeholder="What needs to be done?"]').press("Enter");

        const checkbox = await page.locator('.toggle');
        await checkbox.check();

        await page.waitForTimeout(2000);
    });
});