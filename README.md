# Citron-Assur Application

Application full-stack avec frontend Angular et backend Spring Boot.

## Description du Projet

Citron-Assur est un projet de démonstration conçu pour implémenter des cas de test BDD (Behavior Driven Development) dans un environnement Angular et Java. Ce projet illustre comment les spécifications exécutables peuvent améliorer le développement agile en créant un pont entre les équipes techniques et métier.

### État Actuel
- ✅ Couverture BDD complète du projet simulateur
- 🚧 Implémentation BDD côté Java à réaliser

## Qu'est-ce que le BDD ?

Le Behavior Driven Development (BDD) est une approche de développement logiciel qui étend le TDD (Test Driven Development) en mettant l'accent sur le comportement du système du point de vue de l'utilisateur. Le BDD utilise un langage naturel structuré pour décrire les comportements attendus, facilitant ainsi la communication entre toutes les parties prenantes du projet.

### Spécifications Exécutables

Les spécifications exécutables sont au cœur du BDD. Elles permettent de :
- **Documenter** le comportement attendu dans un langage compréhensible par tous
- **Valider** automatiquement que le système répond aux exigences
- **Maintenir** une documentation vivante et toujours à jour

Format typique (Gherkin) :
```gherkin
Fonctionnalité: Simulation de produits d'assurance
  En tant qu'utilisateur
  Je veux simuler différents produits d'assurance
  Afin de choisir celui qui correspond le mieux à mes besoins

  Scénario: Affichage des produits par catégorie
    Étant donné que je suis sur la page d'accueil
    Quand je clique sur une catégorie de produits
    Alors je vois la liste des produits de cette catégorie
    Et chaque produit affiche ses informations principales
```

### Avantages du BDD dans l'Approche Agile

1. **Communication Améliorée**
   - Langage commun entre développeurs, testeurs et métier
   - Réduction des malentendus et des ambiguïtés
   - Documentation vivante des fonctionnalités

2. **Qualité Accrue**
   - Tests automatisés basés sur les comportements métier
   - Détection précoce des régressions
   - Couverture fonctionnelle complète

3. **Collaboration Renforcée**
   - Implication de toutes les parties prenantes dès le début
   - Définition collaborative des critères d'acceptation
   - Feedback rapide et continu

4. **Agilité Optimisée**
   - Livraisons fréquentes avec confiance
   - Refactoring sécurisé grâce aux tests automatisés
   - Adaptation rapide aux changements de requirements

## Structure du Projet
- `/frontend` - Application Angular 19
- `/backend` - Spring Boot 3.3.6 avec Java 21
- `/data` - Fichiers JSON de données de produits d'assurance

## Technologies Utilisées

### Frontend
- Angular 19 avec composants standalone
- Angular Material pour l'UI
- TypeScript
- RxJS pour la programmation réactive

### Backend
- Spring Boot 3.3.6
- Java 21
- Maven
- Swagger/OpenAPI pour la documentation API

### Tests BDD (À venir)
- Cucumber pour Java
- Playwright pour les tests E2E Angular
- Gherkin pour les spécifications

## Exécution de l'Application

### Backend
```bash
cd backend
mvn spring-boot:run
```
- S'exécute sur http://localhost:8080
- Interface Swagger disponible sur http://localhost:8080/swagger-ui.html

### Frontend
```bash
cd frontend
npm start
```
- S'exécute sur http://localhost:4200
- Proxy configuré pour rediriger les appels API vers le backend

## Endpoints API
- GET `/api/products` - Retourne tous les produits d'assurance
- GET `/api/products/{type}` - Retourne les produits d'un type spécifique
- GET `/api/products/{type}/{id}` - Retourne un produit spécifique

## Guide d'Implémentation BDD

### 1. Configuration de l'Environnement de Test

#### Frontend - Playwright avec Cucumber

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

#### Backend - Cucumber avec Spring Boot

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

### 2. Écriture des Features (Gherkin)

#### Feature: Gestion des Produits d'Assurance

`tests/features/products-management.feature` :
```gherkin
# language: fr
Fonctionnalité: Gestion des produits d'assurance
  En tant qu'utilisateur de Citron-Assur
  Je veux consulter et filtrer les produits d'assurance
  Afin de trouver le produit qui correspond à mes besoins

  Contexte:
    Étant donné que je suis sur la page d'accueil de Citron-Assur

  Scénario: Affichage de tous les produits groupés par type
    Quand je consulte la liste des produits
    Alors je vois 6 catégories de produits
    Et chaque catégorie est représentée par une icône distinctive
    Et je peux voir le nombre de produits dans chaque catégorie

  Scénario: Consultation des détails d'un produit
    Étant donné que je vois la liste des produits "Assurance Vie"
    Quand je clique sur le produit "Netissima Plus"
    Alors une fenêtre modale s'ouvre
    Et je vois les informations détaillées du produit
    Et je peux naviguer entre les onglets "Informations", "Détails" et "JSON"

  Plan du scénario: Filtrage par type de produit
    Quand je déplie la catégorie "<type_produit>"
    Alors je vois <nombre> produits dans cette catégorie
    Et chaque produit affiche son nom commercial
    Et chaque produit affiche son identifiant

    Exemples:
      | type_produit          | nombre |
      | Assurance Vie         | 3      |
      | PER Individuel        | 3      |
      | Contrat Madelin       | 3      |
      | Contrat Capitalisation| 3      |
      | Prévoyance Mixte      | 3      |
      | Rente Viagère         | 3      |
```

#### Feature: Validation des Données Produits

`tests/features/product-validation.feature` :
```gherkin
# language: fr
Fonctionnalité: Validation des données produits
  Les produits d'assurance doivent respecter certaines règles métier

  Règle: Tous les produits doivent avoir des informations obligatoires

    Scénario: Vérification des champs obligatoires
      Étant donné un produit de type "Assurance Vie"
      Alors le produit doit avoir un "nom_commercial"
      Et le produit doit avoir un "id" unique
      Et le produit doit avoir un "type" valide
      Et le produit doit avoir un objet "data" non vide

  Règle: Les produits d'assurance vie ont des frais spécifiques

    Scénario: Validation des frais d'assurance vie
      Étant donné le produit "Netissima Plus" de type "Assurance Vie"
      Alors les frais de gestion doivent être entre 0% et 5%
      Et les frais d'entrée doivent être entre 0% et 10%
      Et les frais d'arbitrage doivent être définis
```

### 3. Implémentation des Steps (TypeScript/Playwright)

#### World Context

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

#### Step Definitions

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

Given('que je suis sur la page d\'accueil de Citron-Assur', async function (this: ICustomWorld) {
  await this.page!.goto(this.baseURL);
  await expect(this.page!.locator('h1')).toContainText('Citron-Assur');
});

When('je consulte la liste des produits', async function (this: ICustomWorld) {
  // Attendre que les produits soient chargés
  await this.page!.waitForSelector('.product-groups');
});

Then('je vois {int} catégories de produits', async function (this: ICustomWorld, count: number) {
  const categories = await this.page!.locator('mat-expansion-panel').count();
  expect(categories).toBe(count);
});

Then('chaque catégorie est représentée par une icône distinctive', async function (this: ICustomWorld) {
  const icons = await this.page!.locator('app-product-icon').count();
  expect(icons).toBeGreaterThan(0);
});

When('je clique sur le produit {string}', async function (this: ICustomWorld, productName: string) {
  await this.page!.locator('mat-list-item')
    .filter({ hasText: productName })
    .click();
});

Then('une fenêtre modale s\'ouvre', async function (this: ICustomWorld) {
  await expect(this.page!.locator('mat-dialog-container')).toBeVisible();
});

Then('je vois les informations détaillées du produit', async function (this: ICustomWorld) {
  await expect(this.page!.locator('mat-dialog-title')).toBeVisible();
  await expect(this.page!.locator('.info-section')).toBeVisible();
});

When('je déplie la catégorie {string}', async function (this: ICustomWorld, category: string) {
  const panel = this.page!.locator('mat-expansion-panel')
    .filter({ has: this.page!.locator(`text="${category}"`) });
  
  const isExpanded = await panel.getAttribute('aria-expanded');
  if (isExpanded === 'false') {
    await panel.click();
  }
});

Then('je vois {int} produits dans cette catégorie', async function (this: ICustomWorld, count: number) {
  // Attendre que la liste soit visible
  await this.page!.waitForTimeout(500);
  const products = await this.page!.locator('mat-list-item:visible').count();
  expect(products).toBe(count);
});
```

### 4. Implémentation des Steps (Java/Spring Boot)

#### Configuration Cucumber

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

#### Step Definitions Java

`src/test/java/com/citronassur/steps/ProductSteps.java` :
```java
package com.citronassur.steps;

import com.citronassur.backend.model.Product;
import com.citronassur.backend.service.SimpleProductService;
import io.cucumber.java.fr.Alors;
import io.cucumber.java.fr.Etantdonné;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductSteps {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private SimpleProductService productService;

    private Product currentProduct;
    private ResponseEntity<List> response;

    @Etantdonné("un produit de type {string}")
    public void unProduitDeType(String type) {
        List<Product> products = productService.getProductsByType(type);
        assertFalse(products.isEmpty(), "Aucun produit trouvé pour le type: " + type);
        currentProduct = products.get(0);
    }

    @Etantdonné("le produit {string} de type {string}")
    public void leProduitDeType(String nomCommercial, String type) {
        List<Product> products = productService.getProductsByType(type);
        currentProduct = products.stream()
            .filter(p -> p.getNom_commercial().equals(nomCommercial))
            .findFirst()
            .orElseThrow(() -> new AssertionError("Produit non trouvé: " + nomCommercial));
    }

    @Alors("le produit doit avoir un {string}")
    public void leProduitDoitAvoirUn(String field) {
        switch (field) {
            case "nom_commercial":
                assertNotNull(currentProduct.getNom_commercial());
                assertFalse(currentProduct.getNom_commercial().isEmpty());
                break;
            case "id":
                assertNotNull(currentProduct.getId());
                assertFalse(currentProduct.getId().isEmpty());
                break;
            case "type":
                assertNotNull(currentProduct.getType());
                assertFalse(currentProduct.getType().isEmpty());
                break;
        }
    }

    @Alors("le produit doit avoir un objet {string} non vide")
    public void leProduitDoitAvoirUnObjetNonVide(String field) {
        if ("data".equals(field)) {
            assertNotNull(currentProduct.getData());
            assertFalse(((Map<?, ?>) currentProduct.getData()).isEmpty());
        }
    }

    @Alors("les frais de gestion doivent être entre {double}% et {double}%")
    public void lesFraisDeGestionDoiventEtreEntre(double min, double max) {
        Map<String, Object> data = (Map<String, Object>) currentProduct.getData();
        Map<String, Object> frais = (Map<String, Object>) data.get("frais");
        assertNotNull(frais, "Les frais ne sont pas définis");
        
        Double fraisGestion = Double.valueOf(frais.get("gestion").toString());
        assertTrue(fraisGestion >= min && fraisGestion <= max,
            String.format("Frais de gestion %.2f%% hors limites [%.2f%%, %.2f%%]", 
                fraisGestion, min, max));
    }
}
```

### 5. Hooks et Configuration Avancée

#### Hooks Playwright

`tests/steps/hooks.ts` :
```typescript
import { Before, After, Status } from '@cucumber/cucumber';
import { ICustomWorld } from '../support/world';

Before({ tags: '@screenshot' }, async function (this: ICustomWorld) {
  // Activer les captures d'écran pour les scénarios tagués
  this.screenshotEnabled = true;
});

After(async function (this: ICustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    // Capture d'écran en cas d'échec
    const screenshot = await this.page!.screenshot({ 
      path: `reports/screenshots/${scenario.pickle.name}-${Date.now()}.png` 
    });
    await this.attach(screenshot, 'image/png');
  }
});
```

#### Configuration Spring pour les Tests

`src/test/java/com/citronassur/config/CucumberSpringConfiguration.java` :
```java
package com.citronassur.config;

import io.cucumber.java.Before;
import io.cucumber.java.After;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@CucumberContextConfiguration
@SpringBootTest
@ActiveProfiles("test")
public class CucumberSpringConfiguration {

    @Before
    public void setUp() {
        // Configuration avant chaque scénario
        System.out.println("Démarrage du scénario de test");
    }

    @After
    public void tearDown() {
        // Nettoyage après chaque scénario
        System.out.println("Fin du scénario de test");
    }
}
```

### 6. Exécution des Tests

#### Frontend
```bash
cd frontend
npm run test:bdd
# ou pour un tag spécifique
npm run test:bdd -- --tags "@critical"
```

#### Backend
```bash
cd backend
mvn test -Dtest=CucumberTestRunner
# ou pour un tag spécifique
mvn test -Dcucumber.filter.tags="@api"
```


## Prochaines Étapes

1. **Implémentation BDD côté Java**
   - Configuration de Cucumber
   - Écriture des feature files
   - Implémentation des step definitions

2. **Tests E2E avec Playwright**
   - Configuration de l'environnement de test
   - Écriture des scénarios Gherkin
   - Automatisation des tests d'interface

3. **Intégration Continue**
   - Pipeline CI/CD avec exécution automatique des tests BDD
   - Rapports de couverture fonctionnelle
   - Déploiement automatisé

## Bonnes Pratiques BDD

### 1. Écriture des Scénarios

- **Utiliser le langage métier** : Éviter le jargon technique dans les features
- **Rester concis** : Un scénario = un comportement spécifique
- **Éviter la dépendance entre scénarios** : Chaque scénario doit être autonome
- **Utiliser des exemples concrets** : Données réalistes plutôt que "test123"

### 2. Organisation des Tests

```
tests/
├── features/
│   ├── products/
│   │   ├── listing.feature
│   │   ├── filtering.feature
│   │   └── details.feature
│   └── api/
│       └── products-api.feature
├── steps/
│   ├── common/
│   │   └── navigation.steps.ts
│   ├── products/
│   │   └── products.steps.ts
│   └── api/
│       └── api.steps.ts
└── support/
    ├── world.ts
    └── helpers/
```

### 3. Réutilisation des Steps

```typescript
// steps/common/shared-steps.ts
export const sharedSteps = {
  async waitForElement(page: Page, selector: string) {
    await page.waitForSelector(selector, { timeout: 10000 });
  },
  
  async checkElementText(page: Page, selector: string, expectedText: string) {
    await expect(page.locator(selector)).toContainText(expectedText);
  }
};

// Utilisation dans les steps spécifiques
import { sharedSteps } from '../common/shared-steps';

Then('je vois le message {string}', async function (this: ICustomWorld, message: string) {
  await sharedSteps.checkElementText(this.page!, '.message', message);
});
```

### 4. Gestion des Données de Test

```typescript
// tests/data/test-data.ts
export const testData = {
  products: {
    assuranceVie: {
      valid: {
        nom: "Netissima Plus",
        type: "assurance-vie",
        fraisGestion: 0.6
      },
      invalid: {
        nom: "",
        type: "invalid-type"
      }
    }
  }
};

// Utilisation dans les features avec des tables
Scenario: Validation des produits
  Given les produits suivants existent:
    | nom             | type           | frais |
    | Netissima Plus  | assurance-vie  | 0.6   |
    | Linxea Avenir   | assurance-vie  | 0.5   |
```

### 5. Tags et Exécution Sélective

```gherkin
@critical @regression
Feature: Produits essentiels

@smoke @api
Scenario: API disponible

@ui @slow
Scenario: Interface complète
```

Exécution par tags :
```bash
# Tests critiques uniquement
npm run test:bdd -- --tags "@critical"

# Tests API sauf les lents
npm run test:bdd -- --tags "@api and not @slow"
```

## Résolution des Problèmes Courants

### Timeout dans les Tests
```typescript
// Augmenter le timeout global
setDefaultTimeout(30 * 1000); // 30 secondes

// Timeout spécifique
When('opération longue', { timeout: 60000 }, async function() {
  // ...
});
```

### Synchronisation Frontend/Backend
```typescript
// Attendre que l'API soit prête
async function waitForAPI(url: string, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return true;
    } catch (e) {
      // Continue
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error('API non disponible');
}
```

### Debug des Tests
```typescript
// Mode debug Playwright
this.browser = await chromium.launch({ 
  headless: false,
  slowMo: 1000 // Ralentir les actions
});

// Points d'arrêt
await this.page.pause(); // Ouvre l'inspecteur Playwright
```

## Contribution

Ce projet est conçu comme une référence pour l'implémentation du BDD dans un contexte full-stack moderne. Les contributions pour améliorer les exemples ou ajouter de nouvelles fonctionnalités sont les bienvenues.