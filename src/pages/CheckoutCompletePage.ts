import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
  private readonly title: Locator;
  private readonly header: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId("title");
    this.header = page.getByTestId("complete-header");
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.title).toHaveText("Checkout: Complete!");
    await expect(this.header).toHaveText("Thank you for your order!");
  }
}
