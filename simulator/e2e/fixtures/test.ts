import { test as base } from 'playwright-bdd';

// Extend base test with automatic retries for flaky actions
export const test = base.extend({
  // Auto-retry actions that might be flaky
  page: async ({ page }, use) => {
    // Set default timeouts
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
    
    // Add auto-retry for click actions
    const originalClick = page.click.bind(page);
    page.click = async (selector: string, options?: any) => {
      try {
        await originalClick(selector, options);
      } catch (error) {
        // Retry once on timeout
        if (error.message?.includes('Timeout')) {
          await page.waitForTimeout(1000);
          await originalClick(selector, options);
        } else {
          throw error;
        }
      }
    };
    
    await use(page);
  },
});