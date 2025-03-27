import { test, expect } from "playwright/test";
import path from "path";

test.describe("Workshop 5", () => {
    test("Open new window and navigate back", async ({ context, page }) => {
        // Use relative path instead of absolute path
        const filePath = path.join(__dirname, "index.html");
        await page.goto(`file://${filePath}`);

        // open new window
        const pagePromise = context.waitForEvent('page');
        // click the button
        await page.click('#openNewWindow');

        // wait for the new page to load
        const newPage = await pagePromise;
        await newPage.waitForLoadState('load');
        // print the title of the new page
        console.log(await newPage.title());

        await page.waitForTimeout(2000);

        // assert the title of the new page
        await expect(newPage.getByRole('heading', {name: "Welcome to the New Page"})).toBeVisible();
    });

    test('Add Cookie', async ({page})=>{
        const filePath = path.join(__dirname, "index.html");
        await page.goto(`file://${filePath}`);
        await page.click('#setCookie');
        const cookies = await page.context().cookies(`file://${filePath}`);
        const sessionCookie = cookies.find(cookies => cookies.name === 'session');
        console.log('Session cookie',sessionCookie);
        await expect(sessionCookie).toBeDefined();
    });
    
    test('Delete cookie', async({page})=>{
        const filePath = path.join(__dirname, "index.html");
        await page.goto(`file://${filePath}`);
        await page.click('#setCookie');
        const cookies = await page.context().cookies(`file://${filePath}`);
        const sessionCookie = cookies.find(cookies => cookies.name === 'session');
        console.log('Session cookie',sessionCookie);
    
        await page.click('#deleteCookie');
        const deletedCookies = await page.context().cookies(`file://${filePath}`);
        const deletedSessionCookie = deletedCookies.find(cookies => cookies.name === 'session');
        console.log('Session cookie',deletedSessionCookie);
        await expect(deletedSessionCookie).toBeUndefined();
    });
});
