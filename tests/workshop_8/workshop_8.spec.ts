import { expect, test } from "@playwright/test";
import { PageObject } from "./page/Page";
import path from "path";

test.describe("Workshop 8", () => {
    let pageObject: PageObject;

    test.beforeEach(async ({ browser }) => {
        const page = await browser.newPage();
        pageObject = new PageObject(page);
        const filePath = path.join(__dirname, "index.html");
        await pageObject.open(filePath);
    });

    test("Fill all inputs", async () => {
        await pageObject.fillFirstName("John");
        await pageObject.fillAge("25");
        await pageObject.checkIsStudent();
        await pageObject.applyData();

        expect(await pageObject.text(pageObject.displayFirstName)).toBe("John");
        expect(await pageObject.text(pageObject.displayAge)).toBe("25");
        expect(await pageObject.text(pageObject.displayIsStudent)).toBe("Yes");
    });
});