import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly cartLink: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId("title");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText("Products");
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async openProductDetail(productName: string): Promise<void> {
    await this.page
      .getByTestId("inventory-item-name")
      .filter({ hasText: productName })
      .first()
      .click();
  }

  async expectCartCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(count));
    }
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}
