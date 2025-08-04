# Guide Complet d'Implémentation BDD

Ce guide détaille l'implémentation complète des tests BDD pour le projet Citron-Assur.

## 1. Configuration de l'Environnement de Test

### Frontend - Playwright avec Cucumber

Installation des dépendances :
```bash
cd frontend
npm install --save-dev @playwright/test @cucumber/cucumber @cucumber/pretty-formatter
npm install --save-dev typescript ts-node
```

Configuration `cucumber.js` :
```javascript
module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['tests/steps/**/*.ts'],
    format: ['@cucumber/pretty-formatter', 'html:reports/cucumber-report.html'],
    paths: ['tests/features/**/*.feature']
  }
};
```

### Backend - Cucumber avec Spring Boot

Ajout des dépendances Maven :
```xml
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-java</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-spring</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>io.cucumber</groupId>
    <artifactId>cucumber-junit-platform-engine</artifactId>
    <version>7.14.0</version>
    <scope>test</scope>
</dependency>
```

## 2. World Context

`tests/support/world.ts` :
```typescript
import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export interface ICustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  baseURL: string;
}

export class CustomWorld extends World implements ICustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  baseURL = 'http://localhost:4200';

  async openBrowser() {
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);
```

## 3. Step Definitions TypeScript

`tests/steps/products.steps.ts` :
```typescript
import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/world';

Before(async function (this: ICustomWorld) {
  await this.openBrowser();
});

After(async function (this: ICustomWorld) {
  await this.closeBrowser();
});

Given('I am on the Citron-Assur homepage', async function (this: ICustomWorld) {
  await this.page!.goto(this.baseURL);
  await expect(this.page!.locator('h1')).toContainText('Citron-Assur');
});

When('I view the product list', async function (this: ICustomWorld) {
  await this.page!.waitForSelector('.product-groups');
});

Then('I see {int} product categories', async function (this: ICustomWorld, count: number) {
  const categories = await this.page!.locator('mat-expansion-panel').count();
  expect(categories).toBe(count);
});

When('I click on product {string}', async function (this: ICustomWorld, productName: string) {
  await this.page!.locator('mat-list-item')
    .filter({ hasText: productName })
    .click();
});

Then('a modal window opens', async function (this: ICustomWorld) {
  await expect(this.page!.locator('mat-dialog-container')).toBeVisible();
});
```

## 4. Configuration Cucumber Java

`src/test/java/com/citronassur/CucumberTestRunner.java` :
```java
package com.citronassur;

import org.junit.platform.suite.api.ConfigurationParameter;
import org.junit.platform.suite.api.IncludeEngines;
import org.junit.platform.suite.api.SelectClasspathResource;
import org.junit.platform.suite.api.Suite;

import static io.cucumber.junit.platform.engine.Constants.GLUE_PROPERTY_NAME;
import static io.cucumber.junit.platform.engine.Constants.PLUGIN_PROPERTY_NAME;

@Suite
@IncludeEngines("cucumber")
@SelectClasspathResource("features")
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.citronassur.steps")
@ConfigurationParameter(key = PLUGIN_PROPERTY_NAME, value = "pretty, html:target/cucumber-report.html")
public class CucumberTestRunner {
}
```

## 5. Step Definitions Java

`src/test/java/com/citronassur/steps/ProductSteps.java` :
```java
package com.citronassur.steps;

import com.citronassur.backend.model.Product;
import com.citronassur.backend.service.SimpleProductService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductSteps {

    @Autowired
    private SimpleProductService productService;

    private Product currentProduct;

    @Given("a product of type {string}")
    public void aProductOfType(String type) {
        List<Product> products = productService.getProductsByType(type);
        assertFalse(products.isEmpty(), "No product found for type: " + type);
        currentProduct = products.get(0);
    }

    @Then("the product should have a {string}")
    public void theProductShouldHaveA(String field) {
        switch (field) {
            case "commercial_name":
                assertNotNull(currentProduct.getNom_commercial());
                assertFalse(currentProduct.getNom_commercial().isEmpty());
                break;
            case "id":
                assertNotNull(currentProduct.getId());
                assertFalse(currentProduct.getId().isEmpty());
                break;
        }
    }
}
```

## 6. Hooks et Configuration Avancée

### Hooks Playwright

`tests/steps/hooks.ts` :
```typescript
import { Before, After, Status } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/world';

After(async function (this: ICustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page!.screenshot({ 
      path: `reports/screenshots/${scenario.pickle.name}-${Date.now()}.png` 
    });
    await this.attach(screenshot, 'image/png');
  }
});
```

## 7. Exécution des Tests

### Frontend
```bash
cd frontend
npm run test:bdd
npm run test:bdd -- --tags "@critical"
```

### Backend
```bash
cd backend
mvn test -Dtest=CucumberTestRunner
mvn test -Dcucumber.filter.tags="@api"
```

## 8. Organisation des Tests

Structure recommandée :
```
tests/
├── features/
│   ├── products/
│   │   ├── listing.feature
│   │   └── details.feature
│   └── api/
│       └── products-api.feature
├── steps/
│   ├── common/
│   ├── products/
│   └── api/
└── support/
    └── world.ts
```

## 9. Réutilisation des Steps

```typescript
// steps/common/shared-steps.ts
export const sharedSteps = {
  async waitForElement(page: Page, selector: string) {
    await page.waitForSelector(selector, { timeout: 10000 });
  }
};
```

## 10. Gestion des Données de Test

```typescript
export const testData = {
  products: {
    assuranceVie: {
      valid: {
        nom: "Netissima Plus",
        type: "assurance-vie",
        fraisGestion: 0.6
      }
    }
  }
};
```