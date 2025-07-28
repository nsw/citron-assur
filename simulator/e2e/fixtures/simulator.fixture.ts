import { test as base } from '@playwright/test';
import { SimulatorPage } from '../pages/simulator.page';

// Define custom fixtures
type SimulatorFixtures = {
  simulatorPage: SimulatorPage;
  navigateToSimulator: void;
};

// Extend base test with our fixtures
export const test = base.extend<SimulatorFixtures>({
  // Auto-fixture that navigates to simulator before each test
  navigateToSimulator: [async ({ page }, use) => {
    // Setup: Navigate to simulator with proper wait
    await page.goto('/', { waitUntil: 'networkidle' });
    
    // Wait for initial render
    await page.waitForSelector('.product-grid', { state: 'visible' });
    
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