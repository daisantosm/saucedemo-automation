import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutInformationPage extends BasePage {
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
    this.errorMessage = page.getByTestId("error");
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  // Llena el formulario. Pasar '' en un campo lo deja vacío (útil para validaciones).
  async fill(
    firstName: string,
    lastName: string,
    postalCode: string,
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
