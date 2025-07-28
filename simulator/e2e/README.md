# E2E Tests with Playwright and BDD

## Overview
This directory contains end-to-end tests for the Insurance Simulator application using Playwright with BDD/Cucumber syntax.

## Structure
```
e2e/
├── features/          # Gherkin feature files
├── steps/            # Step definitions
├── pages/            # Page Object Models
├── fixtures/         # Test data
└── reports/          # Test execution reports (gitignored)
```

## Running Tests

### Prerequisites
Make sure the simulator is running on port 4201:
```bash
npm start
```

### Run all tests
```bash
npm run e2e
```

### Run tests with UI mode (recommended for development)
```bash
npm run e2e:ui
```

### Debug tests
```bash
npm run e2e:debug
```

### Generate new tests with Codegen
```bash
npm run e2e:codegen
```

### View test reports
```bash
npm run e2e:report
```

## Writing New Tests

1. **Create a feature file** in `e2e/features/`
   ```gherkin
   Feature: My Feature
     Scenario: My Scenario
       Given I am on the simulator page
       When I perform an action
       Then I should see the result
   ```

2. **Implement step definitions** in `e2e/steps/`
   ```typescript
   import { createBdd } from 'playwright-bdd';
   const { Given, When, Then } = createBdd();
   
   When('I perform an action', async ({ page }) => {
     // Implementation
   });
   ```

3. **Use Page Objects** for better maintainability
   ```typescript
   const simulatorPage = new SimulatorPage(page);
   await simulatorPage.selectProduct('Assurance-Vie');
   ```

## Best Practices

- Use Page Object Model pattern for maintainability
- Keep step definitions simple and reusable
- Use data tables for complex test data
- Take screenshots on failures (automatic)
- Use descriptive scenario names
- Group related scenarios in feature files

## CI/CD Integration

Tests are configured to run in CI mode with:
- Retries on failure
- Parallel execution disabled
- Screenshots and videos on failure
- JSON and HTML reports