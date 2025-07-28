import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';

const { When, Then } = createBdd();

let simulatorPage: SimulatorPage;

When('I fill the form with:', async ({ page }, dataTable) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  const formData = dataTable.rowsHash();
  await simulatorPage.fillForm(formData);
});

Then('I should see the {string} field', async ({ page }, fieldId: string) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  const isVisible = await simulatorPage.isFieldVisible(fieldId);
  expect(isVisible).toBe(true);
});

Then('I should not see the {string} field', async ({ page }, fieldId: string) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  const isVisible = await simulatorPage.isFieldVisible(fieldId);
  expect(isVisible).toBe(false);
});

// The "But" keyword is just an alias for "Then" in Cucumber/Gherkin

Then('the {string} field should have value {string}', async ({ page }, fieldId: string, value: string) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  const fieldValue = await simulatorPage.getFieldValue(fieldId);
  expect(fieldValue).toBe(value);
});

Then('the {string} field should be disabled', async ({ page }, fieldId: string) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  const isDisabled = await simulatorPage.isFieldDisabled(fieldId);
  expect(isDisabled).toBe(true);
});

Then('I should see all these fields:', async ({ page }, dataTable) => {
  const expectedFields = dataTable.raw().flat();
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  
  // Wait for form to be fully loaded
  await page.waitForLoadState('networkidle');
  await page.waitForSelector('.form-grid', { state: 'visible' });
  
  // Wait specifically for dynamic fields to be rendered
  // Check if any productFields exist by waiting for at least one
  const dynamicFieldsExist = expectedFields.some(field => 
    ['ageRetraite', 'tauxRendement', 'dureeInvestissement', 'tauxReversion', 'ageConjoint'].includes(field)
  );
  
  if (dynamicFieldsExist) {
    // Wait for at least one dynamic field to be visible
    await page.waitForSelector('[id="ageRetraite"], [id="tauxRendement"], [id="dureeInvestissement"]', { 
      state: 'visible',
      timeout: 5000 
    }).catch(() => {
      // If no dynamic fields found, that's ok - continue
    });
  }
  
  // Additional wait for all fields to stabilize
  await page.waitForTimeout(1000);
  
  // Check each field with proper error reporting
  const missingFields: string[] = [];
  
  for (const fieldId of expectedFields) {
    const isVisible = await simulatorPage.isFieldVisible(fieldId);
    if (!isVisible) {
      missingFields.push(fieldId);
    }
  }
  
  if (missingFields.length > 0) {
    // Debug: log what fields are actually visible
    const allInputs = await page.locator('input[id], select[id]').evaluateAll(elements => 
      elements.map(el => el.id)
    );
    console.log('Visible field IDs:', allInputs);
    console.log('Expected fields:', expectedFields);
    console.log('Missing fields:', missingFields);
    
    throw new Error(`The following fields are not visible: ${missingFields.join(', ')}`);
  }
});