import { expect, test } from "playwright/test";

test.describe('Workshop 10', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://demo.playwright.dev/todomvc/');
    });

    test("Interacting with elements", async ({ page }) => {

        // XPath selector
        // /html/body/section/div/header/input
        // Full XPath selector
        // /html/body/section/div/header/input

        // Selector
        // body > section > div > header > input
    });

    test('Screenshot', async ({ page }) => {
        await page.screenshot({ path: 'fail.png' });
        await page.goto('https://demo.playwright.dev/todomvc/');
    });

    test('Flaky test', async ({ page }) => {
        
        // page.on('response', async (response) => {
        //     if (response.status() === 404) {
        //         await page.reload();
        //     }
        // });

        // page.on('response', (response)=>{
        //      console.log(`Received from :${response.url()}`)    
        // })

        const flakyTest = Math.random() < 0.5; 
        
        if(flakyTest) {
            await page.waitForTimeout(2000); 
            await page.click('.non-existent-selector'); // This will fail if the selector doesn't exist
        }
    });
});