import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { AngularHelper } from '../helpers/angular-helper';

export class SimulatorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  private productCard = (productName: string) => 
    this.page.locator('.product-card').filter({ has: this.page.locator('.product-title', { hasText: productName }) });
  
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
    const card = this.productCard(productName).first();
    await card.click();
    // Wait for the selection class to be applied
    await expect(card).toHaveClass(/selected/, { timeout: 5000 });
  }

  async isProductSelected(productName: string): Promise<boolean> {
    const card = this.productCard(productName).first();
    await card.waitFor({ state: 'visible' });
    const classes = await card.getAttribute('class') || '';
    return classes.includes('selected');
  }

  async continueToNextStep() {
    await this.clickButton('Continuer avec ce produit');
    
    // Wait for form to be ready
    await AngularHelper.waitForFormReady(this.page);
  }

  async goBack() {
    const currentStep = await this.getCurrentStep();
    await this.clickButton('Retour');
    // Wait for previous step to be visible
    if (currentStep === 2) {
      await this.page.waitForSelector('.product-grid', { state: 'visible' });
    } else if (currentStep === 3) {
      await this.page.waitForSelector('.form-grid', { state: 'visible' });
    }
  }

  async calculate() {
    await this.clickButton('Calculer');
    // Wait for results to appear
    await this.page.waitForSelector('.results-section-container', { state: 'visible' });
  }

  async newSimulation() {
    await this.clickButton('Nouvelle simulation');
    // Wait for product grid to be visible
    await this.page.waitForSelector('.product-grid', { state: 'visible' });
  }

  async fillForm(formData: Record<string, string>) {
    for (const [field, value] of Object.entries(formData)) {
      const element = this.formField(field);
      
      // Check if field exists and is visible
      const exists = await element.count() > 0;
      if (!exists) continue;
      
      const isVisible = await element.isVisible();
      if (!isVisible) continue;
      
      const tagName = await element.evaluate(el => el.tagName.toLowerCase());
      
      if (tagName === 'input') {
        await element.fill(value);
        // Verify the value was set
        await expect(element).toHaveValue(value);
      } else if (tagName === 'select') {
        await element.selectOption(value);
        // Verify the option was selected
        await expect(element).toHaveValue(value);
      }
    }
  }

  async isFieldVisible(fieldId: string): Promise<boolean> {
    try {
      // Wait for Angular to be stable
      await AngularHelper.waitForAngular(this.page);
      
      // Check if field exists in DOM first
      const field = this.formField(fieldId);
      const count = await field.count();
      if (count === 0) return false;
      
      // Then check visibility
      return await field.isVisible();
    } catch {
      return false;
    }
  }

  async isFieldDisabled(fieldId: string): Promise<boolean> {
    // Ensure we're on the form page
    await this.page.waitForSelector('.form-grid', { state: 'visible', timeout: 10000 });
    
    const field = this.formField(fieldId);
    await field.waitFor({ state: 'visible', timeout: 5000 });
    return await field.isDisabled();
  }

  async getFieldValue(fieldId: string): Promise<string> {
    // Ensure we're on the form page before trying to get field value
    await this.page.waitForSelector('.form-grid', { state: 'visible', timeout: 10000 });
    
    const field = this.formField(fieldId);
    
    // Wait for field to be attached and visible
    await field.waitFor({ state: 'visible', timeout: 5000 });
    
    const tagName = await field.evaluate(el => el.tagName.toLowerCase());
    
    if (tagName === 'select') {
      // For select elements, use evaluate to get the value
      return await field.evaluate((el: HTMLSelectElement) => el.value);
    }
    
    return await field.inputValue();
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
    const resultsContainer = this.page.locator('.results-section-container');
    await expect(resultsContainer).toBeVisible({ timeout: 10000 });
    // Wait for the amount to be rendered
    await expect(this.resultAmount()).toBeVisible();
  }
}