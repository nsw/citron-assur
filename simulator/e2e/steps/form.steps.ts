import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';
import { createBdd } from 'playwright-bdd';

const { When: BddWhen, Then: BddThen } = createBdd();

let simulatorPage: SimulatorPage;

BddWhen('I fill the form with:', async ({ page }, dataTable) => {
  simulatorPage = new SimulatorPage(page);
  const formData = dataTable.rowsHash();
  await simulatorPage.fillForm(formData);
});

BddThen('I should see the {string} field', async ({ page }, fieldId: string) => {
  const isVisible = await simulatorPage.isFieldVisible(fieldId);
  expect(isVisible).toBe(true);
});

BddThen('I should not see the {string} field', async ({ page }, fieldId: string) => {
  const isVisible = await simulatorPage.isFieldVisible(fieldId);
  expect(isVisible).toBe(false);
});

BddThen('the {string} field should have value {string}', async ({ page }, fieldId: string, value: string) => {
  const fieldValue = await simulatorPage.getFieldValue(fieldId);
  expect(fieldValue).toBe(value);
});

BddThen('the {string} field should be disabled', async ({ page }, fieldId: string) => {
  const isDisabled = await simulatorPage.isFieldDisabled(fieldId);
  expect(isDisabled).toBe(true);
});

BddThen('I should see all these fields:', async ({ page }, dataTable) => {
  const expectedFields = dataTable.raw().flat();
  
  for (const fieldId of expectedFields) {
    const isVisible = await simulatorPage.isFieldVisible(fieldId);
    expect(isVisible).toBe(true);
  }
});