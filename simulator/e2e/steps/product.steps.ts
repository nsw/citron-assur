import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';
import { createBdd } from 'playwright-bdd';

const { When: BddWhen, Then: BddThen } = createBdd();

let simulatorPage: SimulatorPage;

BddWhen('I select the {string} product', async ({ page }, productName: string) => {
  simulatorPage = new SimulatorPage(page);
  await simulatorPage.selectProduct(productName);
});

BddThen('I should see {int} insurance products', async ({ page }, count: number) => {
  const products = page.locator('.product-card');
  await expect(products).toHaveCount(count);
});

BddThen('I should see the following products:', async ({ page }, dataTable) => {
  const expectedProducts = dataTable.raw().flat();
  
  for (const product of expectedProducts) {
    await expect(page.locator('.product-card', { hasText: product })).toBeVisible();
  }
});

BddThen('the {string} product should be highlighted', async ({ page }, productName: string) => {
  const isSelected = await simulatorPage.isProductSelected(productName);
  expect(isSelected).toBe(true);
});

BddThen('the continue button should be enabled', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Continuer avec ce produit' });
  await expect(button).toBeEnabled();
});

BddThen('the {string} product should show these features:', async ({ page }, productName: string, dataTable) => {
  const expectedFeatures = dataTable.raw().flat();
  const productCard = page.locator('.product-card').filter({ hasText: productName });
  
  for (const feature of expectedFeatures) {
    await expect(productCard.locator('li', { hasText: feature })).toBeVisible();
  }
});

BddThen('no product should be selected', async ({ page }) => {
  const selectedProducts = page.locator('.product-card.selected');
  await expect(selectedProducts).toHaveCount(0);
});