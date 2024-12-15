import { Locator, Page, expect } from "@playwright/test";

export class BuyItems {
    // Atribut untuk Masukkan Produk Ke Keranjang
    itemName: Locator;
    sizeButton: Locator;
    colorButton: Locator;
    quantityField: Locator;
    addToCartButton: Locator;

    // Atribut untuk Menuju Keranjang
    keranjangButton: Locator;
    proceedToCheckoutButton: Locator;

    // Atribut untuk proses Checkout
    nextShippingButton: Locator;
    placeOrderButton: Locator;

    // Konstruktor
    constructor(page: Page) {
        // Konstruktor untuk Masukkan Produk Ke Keranjang
        this.itemName = page.locator('//*[@title="Hero Hoodie"]');
        this.sizeButton = page.locator('//*[@option-label="XL"]');
        this.colorButton = page.locator('//*[@option-label="Green"]');
        this.quantityField = page.locator('//*[@title="Qty"]');
        this.addToCartButton = page.locator('//*[@title="Add to Cart"]');

        // Konstruktor untuk Menuju Keranjang
        this.keranjangButton = page.locator('//*[@class="action showcart"]');
        this.proceedToCheckoutButton = page.locator('//*[@id="top-cart-btn-checkout"]');

        // Konstruktor untuk proses Checkout
        this.nextShippingButton = page.locator('//*[@data-role="opc-continue"]');
        this.placeOrderButton = page.locator('//*[@class="action primary checkout"]');
    }

    // Metode untuk Masukkan Produk Ke Keranjang
    async addProduct(itemName: string, size: string, color: string, quantity: string) {
        await this.itemName.click();
        await this.sizeButton.click();
        await this.colorButton.click();
        await this.quantityField.fill(quantity);
        await this.addToCartButton.click();
    }

    async assertAddProductSuccess(page: Page) {
        await expect(page.locator('//*[@role="alert"]')).toBeVisible();}

    // Metode untuk Menuju Keranjang dan page order summary
    async goToCart() {
        await this.keranjangButton.click();
        await this.proceedToCheckoutButton.click();
    }

    async assertGoToCartSuccess(page: Page) {
        await expect(page.locator('//*[@class="logo"]')).toBeVisible();
        await expect(page.getByText('Order Summary')).toBeVisible();} //harusnya bisa di improve si gak pake to be visible (Mungkinnnn :D )

    // Metode untuk proses Checkout
    async checkout() {
        await this.nextShippingButton.click();
        await this.placeOrderButton.click();
    }

    async assertCheckoutSuccess(page: Page) {
        await expect(page.locator('//*[@class="page-title"]')).toContainText('Thank you for your purchase!'); }
    
}