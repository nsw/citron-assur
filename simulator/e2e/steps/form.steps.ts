import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';
import { AngularHelper } from '../helpers/angular-helper';
import { customExpect } from '../fixtures/custom-matchers';

const { When, Then } = createBdd();

When('I fill the form with:', async ({ page }, dataTable) => {
  const simulatorPage = new SimulatorPage(page);
  const formData = dataTable.rowsHash();
  await simulatorPage.fillForm(formData);
});

Then('I should see the {string} field', async ({ page }, fieldId: string) => {
  const simulatorPage = new SimulatorPage(page);
  const isVisible = await simulatorPage.isFieldVisible(fieldId);
  expect(isVisible).toBe(true);
});

Then('I should not see the {string} field', async ({ page }, fieldId: string) => {
  const simulatorPage = new SimulatorPage(page);
  const isVisible = await simulatorPage.isFieldVisible(fieldId);
  expect(isVisible).toBe(false);
});

// The "But" keyword is just an alias for "Then" in Cucumber/Gherkin

Then('the {string} field should have value {string}', async ({ page }, fieldId: string, value: string) => {
  const simulatorPage = new SimulatorPage(page);
  const fieldValue = await simulatorPage.getFieldValue(fieldId);
  expect(fieldValue).toBe(value);
});

Then('the {string} field should be disabled', async ({ page }, fieldId: string) => {
  const simulatorPage = new SimulatorPage(page);
  const isDisabled = await simulatorPage.isFieldDisabled(fieldId);
  expect(isDisabled).toBe(true);
});

Then('I should see all these fields:', async ({ page }, dataTable) => {
  const expectedFields = dataTable.raw().flat();
  
  // Wait for form to be ready
  await AngularHelper.waitForFormReady(page);
  
  // Wait for all expected fields to be rendered in DOM
  await AngularHelper.waitForFieldsToRender(page, expectedFields);
  
  // Use custom matcher to check all fields at once
  await customExpect(page).toHaveAllFieldsVisible(expectedFields);
});