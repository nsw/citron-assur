import { expect } from '@playwright/test';
import { Page } from '@playwright/test';

// Extend Playwright's expect with custom matchers
export const customExpect = expect.extend({
  async toHaveFieldVisible(page: Page, fieldId: string) {
    const field = page.locator(`#${fieldId}`);
    
    try {
      // First check if element exists in DOM
      const exists = await field.count() > 0;
      if (!exists) {
        return {
          message: () => `Field with id "${fieldId}" does not exist in DOM`,
          pass: false,
        };
      }
      
      // Then check if it's visible
      const isVisible = await field.isVisible();
      
      return {
        message: () => isVisible 
          ? `Field with id "${fieldId}" is visible`
          : `Field with id "${fieldId}" exists but is not visible`,
        pass: isVisible,
      };
    } catch (error) {
      return {
        message: () => `Error checking field "${fieldId}": ${error}`,
        pass: false,
      };
    }
  },
  
  async toHaveAllFieldsVisible(page: Page, fieldIds: string[]) {
    const results = await Promise.all(
      fieldIds.map(async (fieldId) => {
        const field = page.locator(`#${fieldId}`);
        const exists = await field.count() > 0;
        const isVisible = exists && await field.isVisible();
        return { fieldId, exists, isVisible };
      })
    );
    
    const missingFields = results.filter(r => !r.exists).map(r => r.fieldId);
    const hiddenFields = results.filter(r => r.exists && !r.isVisible).map(r => r.fieldId);
    const allVisible = missingFields.length === 0 && hiddenFields.length === 0;
    
    return {
      message: () => {
        let msg = '';
        if (missingFields.length > 0) {
          msg += `Missing fields: ${missingFields.join(', ')}. `;
        }
        if (hiddenFields.length > 0) {
          msg += `Hidden fields: ${hiddenFields.join(', ')}. `;
        }
        if (allVisible) {
          msg = `All fields are visible: ${fieldIds.join(', ')}`;
        }
        return msg;
      },
      pass: allVisible,
    };
  }
});