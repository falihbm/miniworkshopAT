import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { faker } from "@faker-js/faker";

test.describe("Create Account & Login Test Case", () => {
  let firstName = faker.person.firstName();
  let lastName = faker.person.lastName();

  let email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });
  let password = faker.internet.password();

  test("User is able to create an account (with OM)", async ({ page }) => {
    console.log("Email:", email);
    console.log("Password:", password);

    const loginPage = new LoginPage(page); // Perbaikan kapitalisasi pada kelas LoginPage

    await page.goto("https://magento.softwaretestingboard.com/");
    await loginPage.createAccount(firstName, lastName, email, password);
    await loginPage.assertAccountCreationSuccess(page, firstName, lastName, email);
  });

  test("User is able to login", async ({ page }) => {
    console.log("Email:", email);
    console.log("Password:", password);

    const loginPage = new LoginPage(page); // Konsistensi pada deklarasi variabel loginPage

    await page.goto("https://magento.softwaretestingboard.com/");
    await loginPage.login(email, password);
    await loginPage.assertLoginSuccess(page, firstName, lastName);
  });
});
