import { expect, test } from "playwright/test";
import path from 'path';

test.describe("Workshop 3", () => {
    test("Advanced Interaction", async ({ page }) => {
        // Use relative path instead of absolute path
        const filePath = path.join(__dirname, 'index.html');
        await page.goto(`file://${filePath}`);

        // hover
        await page.hover('button#hover-me');
        // assert hover
        expect(await page.textContent('button#hover-me')).toContain("Text Changed!");

        // right click
        await page.click('button#context-menu', { button: "right" });
        // assert right click
        expect(await page.getByText('Context Menu Appears!').textContent()).toContain("Context Menu Appears!");

        // double click
        await page.dblclick('button#double-click');
        expect(await page.locator('img').count()).toBe(1);

    })

    test("Drag and Drop", async ({ page }) => {
        // Use relative path
        const filePath = path.join(__dirname, 'index.html');
        await page.goto(`file://${filePath}`);    

        // Method 1
        await page.dragAndDrop('.drag-source', '.drop-target');

        // Method 2
        // await page.locator('.drag-source').hover();
        // await page.mouse.down();
        // await page.locator('.drop-target').hover();
        // await page.mouse.up();
        
        // Uncomment the assertion
        expect(await page.textContent('.drop-target')).toContain("Success");

        await page.waitForTimeout(2000);
    });

    test.only("Handling iFrame", async ({ page }) => {
        // Use relative path
        const filePath = path.join(__dirname, 'index.html');
        await page.goto(`file://${filePath}`);
        
        const iframeElement = await page.frame({name: 'iframeName'});
        const inputSelector = '#iframe-input';

        // Method 1
        await iframeElement?.type(inputSelector, 'Hello Playwright');
        expect(await iframeElement?.locator(inputSelector).inputValue()).toContain('Hello Playwright');

        await page.waitForTimeout(2000);

        // clear input field
        await iframeElement?.locator(inputSelector).clear();

        await page.waitForTimeout(2000);

        // Method 2
        if (iframeElement) {
            await iframeElement.type(inputSelector, 'Hello User');
            expect(await iframeElement.locator(inputSelector).inputValue()).toContain('Hello User');
        } else {
            console.log('IFrame element not found');
        }

        await page.waitForTimeout(2000);
    });
})
