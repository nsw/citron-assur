import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'e2e/features/**/*.feature',
  steps: 'e2e/steps/**/*.ts',
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : 8,
  timeout: 60000,
  reporter: [
    ['html', { outputFolder: 'e2e/reports/html' }],
    ['json', { outputFile: 'e2e/reports/results.json' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:4201',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Capture screenshots on every action for better debugging
    actionTimeout: 15000,
    navigationTimeout: 30000,
    // Auto-waiting features
    launchOptions: {
      slowMo: 50, // Slow down actions by 50ms to reduce flakiness
    },
    // Viewport size
    viewport: { width: 1280, height: 720 },
    // Accept downloads
    acceptDownloads: true,
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'npm start',
    port: 4201,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});