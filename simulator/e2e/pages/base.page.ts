import { Page, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(path: string = '') {
    await this.page.goto(path);
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle', { timeout: 30000 });
  }

  async clickButton(text: string) {
    const button = this.page.getByRole('button', { name: text });
    
    // Wait for button to be visible and enabled
    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled();
    
    // Click and wait for any navigation or network activity
    await Promise.all([
      button.click(),
      // Wait for either navigation or network idle (whichever comes first)
      Promise.race([
        this.page.waitForNavigation({ waitUntil: 'networkidle' }).catch(() => {}),
        this.page.waitForLoadState('networkidle').catch(() => {})
      ])
    ]);
  }

  async fillInput(label: string, value: string) {
    await this.page.getByLabel(label).fill(value);
  }

  async selectOption(label: string, value: string) {
    await this.page.getByLabel(label).selectOption(value);
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  async getText(selector: string): Promise<string> {
    return await this.page.locator(selector).textContent() || '';
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector, { state: 'visible', timeout: 10000 });
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `e2e/reports/screenshots/${name}.png`, fullPage: true });
  }
}