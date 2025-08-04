# Guide de Résolution des Problèmes BDD

Solutions aux problèmes courants rencontrés lors des tests BDD.

## Problèmes de Configuration

### Erreur: Module TypeScript non trouvé
```bash
Error: Cannot find module 'ts-node/register'
```

**Solution :**
```bash
npm install --save-dev ts-node typescript
```

### Erreur: Cucumber ne trouve pas les steps
```bash
Error: Step "je suis sur la page" is not defined
```

**Solution :**
Vérifier le fichier `cucumber.js` :
```javascript
module.exports = {
  default: {
    require: ['tests/steps/**/*.ts'], // Chemin correct
    requireModule: ['ts-node/register']
  }
};
```

## Problèmes de Synchronisation

### Tests instables (flaky tests)
**Symptômes :** Tests qui passent parfois, échouent parfois

**Solutions :**

1. **Attendre les éléments explicitement :**
```typescript
// ❌ Mauvais
await this.page.click('.button');

// ✅ Bon
await this.page.waitForSelector('.button');
await this.page.click('.button');
```

2. **Augmenter les timeouts :**
```typescript
// Dans world.ts
setDefaultTimeout(30 * 1000); // 30 secondes

// Pour un step spécifique
When('opération longue', { timeout: 60000 }, async function() {
  // ...
});
```

3. **Attendre que l'API soit prête :**
```typescript
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

## Problèmes Playwright

### Navigateur ne s'ouvre pas
**Solution :**
```bash
npx playwright install
```

### Erreur: Page fermée prématurément
**Solution :**
```typescript
// Dans hooks.ts
After(async function (this: ICustomWorld) {
  if (this.page && !this.page.isClosed()) {
    await this.page.close();
  }
});
```

### Éléments non trouvés
**Solution :**
```typescript
// Attendre et vérifier la visibilité
await this.page.waitForSelector('.element', { 
  state: 'visible',
  timeout: 10000 
});
```

## Debug des Tests

### Mode Debug Playwright
```typescript
// Dans world.ts
this.browser = await chromium.launch({ 
  headless: false,
  slowMo: 1000, // Ralentir les actions
  devtools: true // Ouvrir les DevTools
});
```

### Points d'arrêt
```typescript
// Dans un step
await this.page.pause(); // Ouvre l'inspecteur Playwright
```

### Captures d'écran automatiques
```typescript
// Dans hooks.ts
After(async function (this: ICustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({ 
      path: `reports/screenshots/${scenario.pickle.name}.png`,
      fullPage: true
    });
    await this.attach(screenshot, 'image/png');
  }
});
```

## Problèmes Spring Boot

### Tests Cucumber ne démarrent pas
**Erreur :**
```
No tests found for given includes
```

**Solution :**
Vérifier le `CucumberTestRunner.java` :
```java
@SelectClasspathResource("features") // Dossier correct
@ConfigurationParameter(key = GLUE_PROPERTY_NAME, value = "com.citronassur.steps")
```

### Injection de dépendances échoue
**Solution :**
```java
@CucumberContextConfiguration
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CucumberSpringConfiguration {
    // Configuration Spring pour Cucumber
}
```

## Problèmes de Performance

### Tests très lents
**Solutions :**

1. **Parallélisation :**
```bash
# Frontend
npm run test:bdd -- --parallel 4

# Backend
mvn test -Dcucumber.execution.parallel.enabled=true
```

2. **Tags pour tests rapides :**
```bash
npm run test:bdd -- --tags "not @slow"
```

3. **Optimiser les sélecteurs :**
```typescript
// ❌ Lent
await this.page.locator('div').filter({ hasText: 'Texte' }).first();

// ✅ Rapide
await this.page.locator('[data-testid="element"]');
```

## Erreurs Communes

### "Element is not attached to the DOM"
**Solution :**
```typescript
// Attendre que l'élément soit stable
await this.page.waitForFunction(() => {
  const element = document.querySelector('.element');
  return element && element.isConnected;
});
```

### "Navigation timeout"
**Solution :**
```typescript
await this.page.goto(url, { 
  waitUntil: 'networkidle',
  timeout: 30000 
});
```

### "Step implementation missing"
**Solution :**
Vérifier que les steps sont bien importés :
```typescript
// Dans cucumber.js
require: [
  'tests/steps/**/*.ts',
  'tests/steps/**/*.js'
]
```

## Logs et Diagnostic

### Activer les logs détaillés
```typescript
// Dans world.ts
this.browser = await chromium.launch({
  args: ['--enable-logging', '--v=1']
});
```

### Logger les actions Playwright
```typescript
// Dans steps
console.log(`Clicking on: ${selector}`);
await this.page.click(selector);
```

### Vérifier l'état de la page
```typescript
// Debug helper
async function debugPage(page: Page) {
  console.log('URL:', page.url());
  console.log('Title:', await page.title());
  const errors = await page.evaluate(() => {
    return window.console.errors || [];
  });
  console.log('Console errors:', errors);
}
```

## Conseils Préventifs

1. **Toujours attendre les éléments** avant interaction
2. **Utiliser des sélecteurs stables** (data-testid)
3. **Implémenter des retry patterns** pour les opérations réseau
4. **Séparer les tests par responsabilité** (UI vs API vs Business logic)
5. **Maintenir les données de test** propres entre les scénarios