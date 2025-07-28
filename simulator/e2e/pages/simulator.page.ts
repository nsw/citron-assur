import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class SimulatorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  private productCard = (productName: string) => 
    this.page.locator('.product-card').filter({ hasText: productName });
  
  private stepIndicator = (stepNumber: number) => 
    this.page.locator(`.step:has(.step-number:has-text("${stepNumber}"))`);
  
  private formField = (fieldId: string) => 
    this.page.locator(`#${fieldId}`);
  
  private tooltip = (fieldLabel: string) => 
    this.page.locator(`label:has-text("${fieldLabel}") .tooltip-text`);
  
  private resultAmount = () => 
    this.page.locator('.highlight-box .amount');
  
  private summaryItem = (label: string) => 
    this.page.locator('.summary-item').filter({ hasText: label }).locator('.summary-value');

  // Actions
  async selectProduct(productName: string) {
    await this.productCard(productName).first().click();
  }

  async isProductSelected(productName: string): Promise<boolean> {
    const card = this.productCard(productName).first();
    const classes = await card.getAttribute('class') || '';
    return classes.includes('selected');
  }

  async continueToNextStep() {
    await this.clickButton('Continuer avec ce produit');
  }

  async goBack() {
    await this.clickButton('Retour');
  }

  async calculate() {
    await this.clickButton('Calculer');
  }

  async newSimulation() {
    await this.clickButton('Nouvelle simulation');
  }

  async fillForm(formData: Record<string, string>) {
    for (const [field, value] of Object.entries(formData)) {
      const element = this.formField(field);
      
      // Wait for field to be visible before interacting
      const isVisible = await element.isVisible();
      if (!isVisible) {
        continue; // Skip fields that aren't visible
      }
      
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      
      if (tagName === 'input') {
        await element.fill(value);
      } else if (tagName === 'select') {
        await element.selectOption(value);
      }
    }
  }

  async isFieldVisible(fieldId: string): Promise<boolean> {
    return await this.formField(fieldId).isVisible();
  }

  async isFieldDisabled(fieldId: string): Promise<boolean> {
    return await this.formField(fieldId).isDisabled();
  }

  async getFieldValue(fieldId: string): Promise<string> {
    return await this.formField(fieldId).inputValue();
  }

  async isStepActive(stepNumber: number): Promise<boolean> {
    const step = this.stepIndicator(stepNumber);
    const classes = await step.getAttribute('class') || '';
    return classes.includes('active');
  }

  async isStepCompleted(stepNumber: number): Promise<boolean> {
    const step = this.stepIndicator(stepNumber);
    const classes = await step.getAttribute('class') || '';
    return classes.includes('completed');
  }

  async getResultAmount(): Promise<string> {
    return await this.resultAmount().textContent() || '';
  }

  async getSummaryValue(label: string): Promise<string> {
    return await this.summaryItem(label).textContent() || '';
  }

  async isChartVisible(): Promise<boolean> {
    return await this.page.locator('canvas[baseChart]').isVisible();
  }

  async getTooltipText(fieldLabel: string): Promise<string> {
    const label = this.page.locator(`label:has-text("${fieldLabel}")`);
    await label.hover();
    return await this.tooltip(fieldLabel).textContent() || '';
  }

  async getCurrentStep(): Promise<number> {
    // Check which section is visible
    if (await this.page.locator('.product-grid').isVisible()) {
      return 1;
    } else if (await this.page.locator('.form-grid').isVisible()) {
      return 2;
    } else if (await this.page.locator('.results-section-container').isVisible()) {
      return 3;
    }
    return 0;
  }

  async waitForResults() {
    await this.page.waitForSelector('.results-section-container');
  }
}