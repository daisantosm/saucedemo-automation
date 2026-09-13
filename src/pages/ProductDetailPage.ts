import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailPage extends BasePage {
  private readonly name: Locator;
  private readonly price: Locator;
  private readonly addToCartButton: Locator;
  private readonly removeButton: Locator;
  private readonly backToProductsButton: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    const details = page.locator(".inventory_details");
    this.name = details.locator(".inventory_details_name");
    this.price = details.locator(".inventory_details_price");
    this.addToCartButton = details.getByRole("button", { name: "Add to cart" });
    this.removeButton = details.getByRole("button", { name: "Remove" });
    this.backToProductsButton = page.getByTestId("back-to-products");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    await expect(this.addToCartButton).toBeVisible();
  }

  async getName(): Promise<string> {
    return (await this.name.innerText()).trim();
  }

  async getPrice(): Promise<string> {
    return (await this.price.innerText()).trim();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.removeButton).toBeVisible();
    await expect(this.cartBadge).toHaveText("1");
  }

  async backToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
