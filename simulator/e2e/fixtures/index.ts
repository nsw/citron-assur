import { test as base } from 'playwright-bdd';
import { SimulatorPage } from '../pages/simulator.page';

type Fixtures = {
  simulatorPage: SimulatorPage;
};

export const test = base.extend<Fixtures>({
  simulatorPage: async ({ page }, use) => {
    const simulatorPage = new SimulatorPage(page);
    await use(simulatorPage);
  },
});

export { expect } from '@playwright/test';