import { expect, test } from "playwright/test";
import path from "path";

const testData = {

    firstName:'John',
    lastName:'Doe',
    address:'123 Main St',
    number: '1234567890'
}

test.describe("Workshop 6L User Registration Test", () => {
    const selector = {
        firstName: "#firstName",
        lastName: "#lastName",
        address: "#address",
        number: "#number",
    }
    test.beforeEach(async ({ page }) => {
        const filePath = path.join(__dirname, "index.html");
        await page.goto(`file://${filePath}`);
    });

    test.skip("Register with valid data", async ({ page }) => {




        await page.fill(selector.firstName, testData.firstName);
        await page.fill(selector.lastName, testData.lastName);
        await page.fill(selector.address, testData.address);
        await page.fill(selector.number, testData.number.toString());

        await expect(page.locator(selector.firstName)).toHaveValue(testData.firstName);
        await expect(page.locator(selector.lastName)).toHaveValue(testData.lastName);
        await expect(page.locator(selector.address)).toHaveValue(testData.address);
        await expect(page.locator(selector.number)).toHaveValue(testData.number.toString());
        
        await page.click("#register");

        await page.waitForTimeout(2000);
    });

    test("Register with All Empty Fields", async ({ page }) => {

        await page.click("#register");
        await expect(page.locator("#error")).toBeVisible();
        const error = await page.locator('#error p').textContent()
        expect(error).toBe('Please fill in all fields.')
        await page.waitForTimeout(2000);    
    });

    test("Register with Empty Fields", async ({ page }) => {

        await page.fill(selector.firstName, testData.firstName);
        await page.fill(selector.lastName, testData.lastName);

        await page.click("#register");
        await expect(page.locator("#error")).toBeVisible();
        const error = await page.locator('#error p').textContent()
        expect(error).toBe('Please fill in all fields.')
        await page.waitForTimeout(2000);    
    });


});