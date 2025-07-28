import { test, expect } from '@playwright/test';

test.describe('Simple Simulator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display 4 products', async ({ page }) => {
    const products = page.locator('.product-card');
    await expect(products).toHaveCount(4);
  });

  test('should select a product and navigate to form', async ({ page }) => {
    // Click on Assurance-Vie
    await page.locator('.product-card').filter({ hasText: 'Assurance-Vie' }).click();
    
    // Check it's selected
    const selectedCard = page.locator('.product-card.selected');
    await expect(selectedCard).toHaveCount(1);
    
    // Click continue
    await page.getByRole('button', { name: 'Continuer avec ce produit' }).click();
    
    // Should see form
    await expect(page.locator('.form-grid')).toBeVisible();
  });

  test('should hide fields based on product', async ({ page }) => {
    // Select Rente Viagère
    await page.locator('.product-card').filter({ hasText: 'Rente Viagère' }).click();
    await page.getByRole('button', { name: 'Continuer avec ce produit' }).click();
    
    // Should NOT see versementsMensuels field
    const monthlyPayments = page.locator('#versementsMensuels');
    await expect(monthlyPayments).not.toBeVisible();
    
    // Should see capital field
    const capital = page.locator('#capital');
    await expect(capital).toBeVisible();
  });
});