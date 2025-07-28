import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('Global setup: Ensuring clean test environment');
  
  // You can add any global setup logic here
  // For example, clearing test data, setting up test accounts, etc.
  
  return async () => {
    console.log('Global teardown: Cleaning up test environment');
  };
}

export default globalSetup;