import { test } from "../src/fixtures/fixtures";
import { USERS } from "../src/data/users";

const PRODUCT_NAME = "Sauce Labs Fleece Jacket";

test.describe("SauceDemo - Bonus: checkout information validation", () => {
  test.beforeEach(
    async ({ loginPage, inventoryPage, productDetailPage, cartPage }) => {
      await loginPage.open();
      await loginPage.login(USERS.standard);
      await inventoryPage.expectLoaded();

      await inventoryPage.openProductDetail(PRODUCT_NAME);
      await productDetailPage.expectLoaded();
      await productDetailPage.addToCart();
      await productDetailPage.backToProducts();

      await inventoryPage.goToCart();
      await cartPage.expectLoaded();
      await cartPage.checkout();
    },
  );

  test("shows a field-level error for each missing required field", async ({
    checkoutInformationPage,
  }) => {
    await checkoutInformationPage.expectLoaded();

    await checkoutInformationPage.continue();
    await checkoutInformationPage.expectError("Error: First Name is required");

    await checkoutInformationPage.fill("Daiana", "", "");
    await checkoutInformationPage.continue();
    await checkoutInformationPage.expectError("Error: Last Name is required");

    await checkoutInformationPage.fill("Daiana", "Santos", "");
    await checkoutInformationPage.continue();
    await checkoutInformationPage.expectError("Error: Postal Code is required");
  });
});
