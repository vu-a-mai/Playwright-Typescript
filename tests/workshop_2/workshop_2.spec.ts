import { expect, test } from "playwright/test";

test.describe("Workshop 2", () => {
    test.skip("Automation Form Submissions", async ({ page }) => {
        // Navigate to playwright demo
        await page.goto("https://demo.playwright.dev/todomvc/");
        
        // get the new todo locator
        const newTodo = await page.getByPlaceholder('What needs to be done?');

        // fill in the form
        await newTodo.fill("Buy some milk");
        // press enter
        await newTodo.press('Enter');
        // fill in the form
        await newTodo.fill("Buy some cheese");
        // press enter
        await newTodo.press('Enter');
        // wait for 2 seconds
        await page.waitForTimeout(2000);

        // get the first todo
        const firstTodo = await page.getByTestId('todo-item').nth(0);
        await firstTodo.getByRole('checkbox').check();
        // wait for 2 seconds
        await page.waitForTimeout(2000);

        // get the second todo
        const secondTodo = await page.getByTestId('todo-item').nth(1);
        

        // assert completed class
        await expect(firstTodo).toHaveClass('completed');

        // assert not completed class
        await expect(secondTodo).not.toHaveClass('completed');
    });

    test("Handling Form", async ({ page }) => {
        // Navigate to playwright demo
        await page.goto("https://demo.playwright.dev/todomvc/");

        // placeholder locator
        const placeholder = '[placeholder="What needs to be done?"]';

        // fill in the form
        await page.fill(placeholder, 'Buy some milk');

        // press enter
        await page.locator(placeholder).press('Enter');

        // checkbox locator
        const checkbox = await page.locator('.toggle');

        // check the checkbox
        await checkbox.check();

        // todo count locator
        const todoCount = await page.getByTestId('todo-count');

        // assert todo count
        await expect(todoCount).toHaveText('0 items left');

        // wait for 2 seconds
        await page.waitForTimeout(2000);

    })
    
});