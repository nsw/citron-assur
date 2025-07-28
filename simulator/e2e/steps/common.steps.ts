import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';
import { createBdd } from 'playwright-bdd';

const { Given: BddGiven, When: BddWhen, Then: BddThen } = createBdd();

let simulatorPage: SimulatorPage;

BddGiven('I am on the simulator page', async ({ page }) => {
  simulatorPage = new SimulatorPage(page);
  await simulatorPage.navigate('/');
  await simulatorPage.waitForPageLoad();
});

BddWhen('I click {string}', async ({ page }, buttonText: string) => {
  await simulatorPage.clickButton(buttonText);
});

BddThen('I should be on step {int}', async ({ page }, stepNumber: number) => {
  await expect(await simulatorPage.getCurrentStep()).toBe(stepNumber);
});

BddThen('I should see {string}', async ({ page }, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
});

BddThen('I should see the help message {string}', async ({ page }, message: string) => {
  await expect(page.locator(`text="${message}"`)).toBeVisible();
});

BddThen('I should see an error message', async ({ page }) => {
  // This will depend on how Angular shows validation errors
  const errorMessages = page.locator('.error-message, [role="alert"], .ng-invalid');
  await expect(await errorMessages.count()).toBeGreaterThan(0);
});

BddThen('I should still be on step {int}', async ({ page }, stepNumber: number) => {
  await expect(await simulatorPage.getCurrentStep()).toBe(stepNumber);
});