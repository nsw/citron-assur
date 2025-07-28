import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';

const { When, Then } = createBdd();

When('I select the {string} product', async ({ page }, productName: string) => {
  const simulatorPage = new SimulatorPage(page);
  await simulatorPage.selectProduct(productName);
});

Then('I should see {int} insurance products', async ({ page }, count: number) => {
  const products = page.locator('.product-card');
  await expect(products).toHaveCount(count);
});

Then('I should see the following products:', async ({ page }, dataTable) => {
  const expectedProducts = dataTable.raw().flat();
  
  for (const product of expectedProducts) {
    await expect(page.locator('.product-card').filter({ hasText: product }).first()).toBeVisible();
  }
});

Then('the {string} product should be highlighted', async ({ page }, productName: string) => {
  const simulatorPage = new SimulatorPage(page);
  const isSelected = await simulatorPage.isProductSelected(productName);
  expect(isSelected).toBe(true);
});

Then('the continue button should be enabled', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Continuer avec ce produit' });
  await expect(button).toBeEnabled();
});

Then('the {string} product should show these features:', async ({ page }, productName: string, dataTable) => {
  const expectedFeatures = dataTable.raw().flat();
  const productCard = page.locator('.product-card').filter({ hasText: productName });
  
  for (const feature of expectedFeatures) {
    await expect(productCard.locator('li', { hasText: feature })).toBeVisible();
  }
});

Then('no product should be selected', async ({ page }) => {
  const selectedProducts = page.locator('.product-card.selected');
  await expect(selectedProducts).toHaveCount(0);
});