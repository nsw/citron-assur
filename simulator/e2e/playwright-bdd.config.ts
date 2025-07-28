import { defineConfig } from 'playwright-bdd';

export default defineConfig({
  features: 'e2e/features/**/*.feature',
  steps: 'e2e/steps/**/*.{ts,js}',
  importTestFrom: 'e2e/fixtures/index.ts',
});