import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private readonly title: Locator;
  private readonly itemName: Locator;
  private readonly itemPrice: Locator;
  private readonly itemQuantity: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId("title");
    this.itemName = page.getByTestId("inventory-item-name");
    this.itemPrice = page.getByTestId("inventory-item-price");
    this.itemQuantity = page.locator(".cart_quantity");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText("Your Cart");
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  // Verifica que el carrito tenga exactamente el producto elegido, al mismo precio.
  async expectSingleItem(name: string, price: string): Promise<void> {
    await expect(this.itemName).toHaveText(name);
    await expect(this.itemPrice).toHaveText(price);
    await expect(this.itemQuantity).toHaveText("1");
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
