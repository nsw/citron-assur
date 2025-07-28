import { Page } from '@playwright/test';

export class AngularHelper {
  /**
   * Wait for Angular to finish all pending operations
   */
  static async waitForAngular(page: Page): Promise<void> {
    await page.waitForFunction(() => {
      // Check if Angular is defined
      if (typeof (window as any).ng === 'undefined') {
        return true; // Angular not loaded yet, consider it "ready"
      }
      
      // Try to get Angular's testability API
      try {
        const testability = (window as any).ng.probe(document.body).injector.get('ApplicationRef');
        return testability.isStable();
      } catch (e) {
        // If we can't access Angular, consider it ready
        return true;
      }
    }, { timeout: 10000 });
  }

  /**
   * Wait for all dynamic fields to be rendered
   */
  static async waitForFieldsToRender(page: Page, expectedFieldIds: string[]): Promise<void> {
    await page.waitForFunction(
      (fieldIds) => {
        // Check if all expected fields exist in the DOM
        return fieldIds.every(id => {
          const element = document.getElementById(id);
          return element !== null;
        });
      },
      expectedFieldIds,
      { timeout: 5000 }
    );
    
    // Additional wait for fields to become visible
    await page.waitForTimeout(100);
  }

  /**
   * Wait for form to be fully initialized
   */
  static async waitForFormReady(page: Page): Promise<void> {
    // Wait for form grid to be visible
    await page.waitForSelector('.form-grid', { state: 'visible' });
    
    // Wait for at least one form field to be visible
    await page.waitForSelector('.form-group input, .form-group select', { state: 'visible' });
    
    // Wait for Angular to stabilize
    await this.waitForAngular(page);
  }
}