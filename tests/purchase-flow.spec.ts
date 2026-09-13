import { test, expect } from "../src/fixtures/fixtures";
import { USERS } from "../src/data/users";

const PRODUCT_NAME = "Sauce Labs Fleece Jacket";
const CUSTOMER = {
  firstName: "Daiana",
  lastName: "Santos",
  postalCode: "11000",
};

test.describe("SauceDemo - Mandatory purchase flow (performance_glitch_user)", () => {
  test("complete and end to end purchase from detail page", async ({
    loginPage,
    inventoryPage,
    productDetailPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await loginPage.open();
    await loginPage.login(USERS.performanceGlitch);
    await inventoryPage.expectLoaded();

    await inventoryPage.openProductDetail(PRODUCT_NAME);
    await productDetailPage.expectLoaded();

    const productName = await productDetailPage.getName();
    const productPrice = await productDetailPage.getPrice();
    expect(productName).toBe(PRODUCT_NAME);

    await productDetailPage.addToCart();

    await productDetailPage.backToProducts();
    await inventoryPage.expectLoaded();
    await inventoryPage.expectCartCount(1);

    await inventoryPage.goToCart();
    await cartPage.expectLoaded();
    await cartPage.expectSingleItem(productName, productPrice);

    await cartPage.checkout();
    await checkoutInformationPage.expectLoaded();
    await checkoutInformationPage.fill(
      CUSTOMER.firstName,
      CUSTOMER.lastName,
      CUSTOMER.postalCode,
    );
    await checkoutInformationPage.continue();

    await checkoutOverviewPage.expectLoaded();
    await checkoutOverviewPage.expectSingleItem(productName, productPrice);
    await checkoutOverviewPage.finish();

    await checkoutCompletePage.expectOrderComplete();
  });
});
