import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'e2e/features/**/*.feature',
  steps: 'e2e/steps/**/*.ts',
});

export default defineConfig({
  globalSetup: require.resolve('./e2e/global-setup.ts'),
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 1 : 8,
  timeout: 60000,
  // Global test settings
  expect: {
    timeout: 10000, // Increase assertion timeout
  },
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
    // Timeouts
    actionTimeout: 15000,
    navigationTimeout: 30000,
    // Auto-waiting features
    launchOptions: {
      slowMo: 100, // Increase slow motion to 100ms for better stability
    },
    // Viewport size
    viewport: { width: 1280, height: 720 },
    // Accept downloads
    acceptDownloads: true,
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    // Test isolation
    storageState: undefined, // Don't share storage between tests
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