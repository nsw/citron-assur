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
  
  // Wait for form to stabilize
  await page.waitForTimeout(1000);
  
  for (const fieldId of expectedFields) {
    const isVisible = await simulatorPage.isFieldVisible(fieldId);
    expect(isVisible).toBe(true);
  }
});