import { test as base } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';
import { AngularHelper } from '../helpers/angular-helper';

// Define custom fixtures
type SimulatorFixtures = {
  simulatorPage: SimulatorPage;
  navigateToSimulator: void;
  angularReady: void;
};

// Extend base test with our fixtures
export const test = base.extend<SimulatorFixtures>({
  // Auto-fixture that ensures Angular is ready
  angularReady: [async ({ page }, use) => {
    // Before each test: wait for Angular
    page.on('navigated', async () => {
      await AngularHelper.waitForAngular(page);
    });
    
    await use();
  }, { auto: true }],
  
  // Auto-fixture that navigates to simulator before each test
  navigateToSimulator: [async ({ page }, use) => {
    // Setup: Navigate to simulator with proper wait
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for Angular to be ready
    await AngularHelper.waitForAngular(page);
    
    // Wait for initial render
    await page.waitForSelector('.product-grid', { state: 'visible' });
    
    // Ensure products are loaded
    await page.waitForSelector('.product-card', { state: 'visible' });
    
    // Use the fixture (test runs here)
    await use();
    
    // Teardown: Clear any state if needed
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  }, { auto: true }], // This runs automatically before each test
  
  // Page object fixture
  simulatorPage: async ({ page }, use) => {
    const simulatorPage = new SimulatorPage(page);
    await use(simulatorPage);
  },
});

export { expect } from '@playwright/test';
export { customExpect } from './custom-matchers';