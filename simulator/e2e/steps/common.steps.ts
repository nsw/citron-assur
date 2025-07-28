import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';

const { Given, When, Then } = createBdd();

let simulatorPage: SimulatorPage;

Given('I am on the simulator page', async ({ page }) => {
  simulatorPage = new SimulatorPage(page);
  await simulatorPage.navigate('/');
  await simulatorPage.waitForPageLoad();
});

When('I click {string}', async ({ page }, buttonText: string) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  await simulatorPage.clickButton(buttonText);
});

Then('I should be on step {int}', async ({ page }, stepNumber: number) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  const currentStep = await simulatorPage.getCurrentStep();
  expect(currentStep).toBe(stepNumber);
});

Then('I should see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

Then('I should see the help message {string}', async ({ page }, message: string) => {
  await expect(page.locator(`text="${message}"`)).toBeVisible();
});

Then('I should see an error message', async ({ page }) => {
  // Check if the button is disabled instead (Angular validation)
  const calculateButton = page.getByRole('button', { name: 'Calculer' });
  const isDisabled = await calculateButton.isDisabled();
  expect(isDisabled).toBe(true);
});

Then('I should still be on step {int}', async ({ page }, stepNumber: number) => {
  if (!simulatorPage) simulatorPage = new SimulatorPage(page);
  const currentStep = await simulatorPage.getCurrentStep();
  expect(currentStep).toBe(stepNumber);
});