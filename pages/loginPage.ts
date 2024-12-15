import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
    // Atribut untuk Create Account
    createAccountButton: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    emailField: Locator;
    passwordField: Locator;
    confirmPasswordField: Locator;
    createAccountButton2: Locator;

    // Atribut untuk Login
    signInButton: Locator;
    signInEmailField: Locator;
    signInPasswordField: Locator;
    signInSubmitButton: Locator;

    // Konstruktor
    constructor(page: Page) {
        // Konstruktor untuk Create Account
        this.createAccountButton = page.getByRole('link', { name: 'Create an Account' });
        this.firstNameField = page.getByLabel('First Name');
        this.lastNameField = page.getByLabel('Last Name');
        this.emailField = page.getByLabel('Email', { exact: true });
        this.passwordField = page.getByRole('textbox', { name: 'Password*', exact: true });
        this.confirmPasswordField = page.getByLabel('Confirm Password');
        this.createAccountButton2 = page.getByRole('button', { name: 'Create an Account' });

        // Konstruktor untuk Login
        this.signInButton = page.getByRole('link', { name: 'Sign In' });
        this.signInEmailField = page.getByLabel('Email', { exact: true });
        this.signInPasswordField = page.getByLabel('Password');
        this.signInSubmitButton = page.getByRole('button', { name: 'Sign In' });
    }

    // Metode untuk Create Account
    async createAccount(firstName: string, lastName: string, email: string, password: string) {
        await this.createAccountButton.click();
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(password);
        await this.createAccountButton2.click();
    }

    async assertAccountCreationSuccess(page: Page, firstName: string, lastName: string, email: string) {
        await expect(page.getByRole('heading', { name: 'My Account' }).locator('span')).toBeVisible();
        await expect(page.locator('#maincontent')).toMatchAriaSnapshot(`
            - strong: Contact Information
            - paragraph: ${firstName} ${lastName} ${email}
            - link "Edit"
            - link "Change Password"
        `);
    }

    // Metode untuk Login
    async login(email: string, password: string) {
        await this.signInButton.click();
        await this.signInEmailField.fill(email);
        await this.signInPasswordField.fill(password);
        await this.signInSubmitButton.click();
    }

    async assertLoginSuccess(page: Page, firstName: string, lastName: string) {
        await expect(page.getByRole('banner').getByText(`Welcome, ${firstName} ${lastName}!`)).toBeVisible();
    }
}