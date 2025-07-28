import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';
import { createBdd } from 'playwright-bdd';

const { Given: BddGiven, Then: BddThen } = createBdd();

let simulatorPage: SimulatorPage;

BddGiven('I have completed a calculation for {string}', async ({ page }, productName: string) => {
  simulatorPage = new SimulatorPage(page);
  await simulatorPage.navigate('/');
  await simulatorPage.waitForPageLoad();
  
  // Select product and continue
  await simulatorPage.selectProduct(productName);
  await simulatorPage.continueToNextStep();
  
  // Fill minimal form data
  const formData = {
    age: '35',
    sexe: 'H',
    statut: 'salarie',
    capital: '10000',
    versementsMensuels: '200',
    dureeInvestissement: '10',
    tauxRendement: '2.5'
  };
  
  await simulatorPage.fillForm(formData);
  await simulatorPage.calculate();
  await simulatorPage.waitForResults();
});

BddThen('I should see the results page', async ({ page }) => {
  await expect(page.locator('.results-section-container')).toBeVisible();
});

BddThen('I should see {string} in the summary', async ({ page }, summaryLabel: string) => {
  await expect(page.locator('.summary-item', { hasText: summaryLabel })).toBeVisible();
});

BddThen('the result amount should be greater than {string}', async ({ page }, expectedAmount: string) => {
  const resultText = await simulatorPage.getResultAmount();
  // Remove currency formatting
  const resultNumber = parseInt(resultText.replace(/[^\d]/g, ''), 10);
  const expectedNumber = parseInt(expectedAmount, 10);
  
  expect(resultNumber).toBeGreaterThan(expectedNumber);
});

BddThen('I should see a chart', async ({ page }) => {
  const isChartVisible = await simulatorPage.isChartVisible();
  expect(isChartVisible).toBe(true);
});