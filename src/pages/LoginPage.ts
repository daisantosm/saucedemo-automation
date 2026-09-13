import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { User } from "../data/users";

export class LoginPage extends BasePage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.getByTestId("username");
    this.password = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorMessage = page.getByTestId("error");
  }

  async open(): Promise<void> {
    await this.goto("/");
    await expect(this.loginButton).toBeVisible();
  }

  async login(user: User): Promise<void> {
    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.loginButton.click();
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
