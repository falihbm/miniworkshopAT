import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { BuyItems } from "../pages/buyItems";

test.describe("Add to cart and checkout", () => {

  let email = "";  // Email yang digunakan untuk login
  let password = ""; // Password yang digunakan untuk login
  let firstName = "Falih Basman"; // Nama depan yang digunakan untuk login
  let lastName = "Mubarok"; // Nama belakang yang digunakan untuk login
  let itemName = "Hero Hoodie"; // Nama barang yang akan dibeli
  let size = "XL"; // Ukuran barang yang akan dibeli
  let color = "Green"; // Warna barang yang akan dibeli
  let quantity = "2"; // Jumlah barang yang akan dibeli

  test("Add to cart and checkout", async ({ page }) => {
    console.log("Email:", email);
    console.log("Password:", password);

    const loginPage = new LoginPage(page);
    const buyItems = new BuyItems(page); 

    await page.goto("https://magento.softwaretestingboard.com/");
    await loginPage.login(email, password);
    await loginPage.assertLoginSuccess(page, firstName, lastName);
    await page.goto("https://magento.softwaretestingboard.com/");
    await buyItems.addProduct(itemName, size, color, quantity);
    await buyItems.assertAddProductSuccess(page);
    await buyItems.goToCart();
    await buyItems.assertGoToCartSuccess(page);
    await buyItems.checkout();
    });
});
