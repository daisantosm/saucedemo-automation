import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {
  private readonly title: Locator;
  private readonly itemName: Locator;
  private readonly itemPrice: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId("title");
    this.itemName = page.getByTestId("inventory-item-name");
    this.itemPrice = page.getByTestId("inventory-item-price");
    this.finishButton = page.getByTestId("finish");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.title).toHaveText("Checkout: Overview");
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async expectSingleItem(name: string, price: string): Promise<void> {
    await expect(this.itemName).toHaveText(name);
    await expect(this.itemPrice).toHaveText(price);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
