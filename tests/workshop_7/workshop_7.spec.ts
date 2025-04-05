import { expect, test } from "playwright/test";
import path from "path";

const selector = {
    firstName: "#firstName",
    age: "#age",
    isStudent: "#isStudent",
}

test.describe("Workshop 7", () => {
    test.beforeEach(async ({ page }) => {
        const filePath = path.join(__dirname, "index.html");
        await page.goto(`file://${filePath}`);
    });

    test("Handling TypeScript Concepts", async ({ page }) => {

        let firstName:string = "John";
        let age:number = 25;
        let isStudent:boolean = false;

        await page.fill(selector.firstName, firstName);
        await page.fill(selector.age, age.toString());
        await page.check(selector.isStudent);
        await page.click("#applyData");

        expect(await page.textContent('#displayFirstName')).toBe(firstName)
        expect(await page.textContent('#displayAge')).toContain(age.toString())
        expect(await page.isChecked('#isStudent')).toBe(true);
    });

  
});

test.describe("Type Definitions and Interfaces", ()=>{

    test.beforeEach(async ({ page }) => {
        const filePath = path.join(__dirname, "index.html");
        await page.goto(`file://${filePath}`);
    });
    
    type Person = {
        firstName: string;
        age: number;
        isStudent: boolean;
    };

    let person: Person = {
        firstName: "John",
        age: 25,
        isStudent: false,
    };

    test("Type Def and Interfaces", async ({ page }) => {
        await page.fill(selector.firstName, person.firstName);
        await page.fill(selector.age, person.age.toString());
        await page.check(selector.isStudent);
        await page.click("#applyData");

        expect(await page.textContent('#displayFirstName')).toBe(person.firstName)
        expect(await page.textContent('#displayAge')).toContain(person.age.toString())
        expect(await page.isChecked('#isStudent')).toBe(true);
    });
    
});