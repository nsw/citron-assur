# Citron-Assur 🍋

> **Projet de démonstration BDD** - Application full-stack avec tests comportementaux en Angular et Java

[![Angular](https://img.shields.io/badge/Angular-19-red.svg)](https://angular.io/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.6-green.svg)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-21-orange.svg)](https://openjdk.java.net/)
[![BDD](https://img.shields.io/badge/BDD-Cucumber-brightgreen.svg)](https://cucumber.io/)

## 📖 Documentation

📚 **[Tutorial BDD Complet](docs/BDD-TUTORIAL.md)** • 🎭 **[Exemples de Features](docs/FEATURES-EXAMPLES.md)** • 🔧 **[Guide de Dépannage](docs/TROUBLESHOOTING.md)**

## 🎯 Vue d'Ensemble

**Citron-Assur** illustre l'implémentation complète du **Behavior Driven Development (BDD)** dans un environnement moderne Angular/Java. Ce projet démontre comment les spécifications exécutables créent un pont efficace entre équipes techniques et métier.

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   Frontend      │ ◄─────────────► │   Backend       │
│   Angular 19    │                 │   Spring Boot   │
│   + Playwright  │                 │   + Cucumber    │
│   + Cucumber    │                 │   + Maven       │
└─────────────────┘                 └─────────────────┘
         │                                   │
         ▼                                   ▼
   ┌──────────────┐                 ┌──────────────┐
   │ Tests E2E    │                 │ Tests API    │
   │ (Gherkin)    │                 │ (Gherkin)    │
   └──────────────┘                 └──────────────┘
```

### État du Projet
- ✅ **Interface utilisateur** complète avec thème citron
- ✅ **API REST** avec documentation Swagger
- ✅ **Framework de tests E2E** Playwright configuré
- 🚧 **Tests BDD côté Java** à implémenter

## 🚀 Démarrage Rapide

### 1. Lancer le Backend
```bash
cd backend
mvn spring-boot:run
# ➜ http://localhost:8080 + Swagger UI
```

### 2. Lancer le Frontend
```bash
cd frontend
npm install && npm start
# ➜ http://localhost:4200
```

### 3. Exécuter les Tests BDD
```bash
cd frontend
npm run test:bdd  # Tests E2E avec Playwright
```

## 💡 Pourquoi BDD pour l'Assurance ?

Le domaine de l'assurance nécessite une **communication précise** entre actuaires, juristes, développeurs et testeurs. Le BDD apporte :

| Bénéfice | Impact sur Citron-Assur |
|----------|-------------------------|
| **Langage Commun** | Scénarios métier compréhensibles par tous |
| **Documentation Vivante** | Features Gherkin toujours à jour |
| **Tests Automatisés** | Validation continue des règles métier |
| **Feedback Rapide** | Détection précoce des régressions |

### Exemple Concret
```gherkin
Scénario: Validation des frais d'assurance vie
  Étant donné le produit "Netissima Plus" de type "Assurance Vie"
  Quand je vérifie les frais de gestion
  Alors ils doivent être entre 0% et 5%
  Et les frais d'entrée doivent être inférieurs à 10%
```

## 🏗️ Architecture

### Technologies

| Couche | Technologie | Version | Usage |
|--------|------------|---------|-------|
| **Frontend** | Angular | 19 | Interface utilisateur |
| | Angular Material | Latest | Composants UI |
| | Playwright | Latest | Tests E2E |
| **Backend** | Spring Boot | 3.3.6 | API REST |
| | Java | 21 | Logique métier |
| | Maven | Latest | Build & dépendances |
| **Tests** | Cucumber | 7.14.0 | Spécifications BDD |
| | Gherkin | Latest | Langage naturel |

### Structure du Projet
```
citron-assur/
├── frontend/           # Application Angular
│   ├── src/app/       # Composants & services
│   └── tests/         # Tests BDD E2E (à venir)
├── backend/           # API Spring Boot
│   ├── src/main/      # Code source
│   └── src/test/      # Tests BDD API (à venir)
├── data/              # JSON produits d'assurance
└── docs/              # Documentation détaillée
```

## 📊 Données d'Exemple

Le projet contient **18 produits d'assurance** répartis en 6 catégories :

- 🏛️ **Assurance Vie** (3 produits)
- 💰 **PER Individuel** (3 produits) 
- 💼 **Contrat Madelin** (3 produits)
- 📈 **Contrat Capitalisation** (3 produits)
- 🛡️ **Prévoyance Mixte** (3 produits)
- ⏳ **Rente Viagère** (3 produits)

### API Endpoints
```
GET /api/products              # Tous les produits
GET /api/products/{type}       # Produits par type
GET /api/products/{type}/{id}  # Produit spécifique
```

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| [**📖 Tutorial BDD Complet**](docs/BDD-TUTORIAL.md) | Configuration et implémentation détaillée |
| [**🎭 Exemples de Features**](docs/FEATURES-EXAMPLES.md) | Scénarios Gherkin complets |
| [**🔧 Guide de Dépannage**](docs/TROUBLESHOOTING.md) | Solutions aux problèmes courants |

## 🎯 Prochaines Étapes

1. **Tests BDD Backend** 
   - Configuration Cucumber Java
   - Validation des règles métier

2. **Tests E2E Frontend**
   - Scénarios d'interaction utilisateur
   - Tests de navigation

3. **Intégration Continue**
   - Pipeline automatisé
   - Rapports de couverture BDD

## 🤝 Contribution

Ce projet sert de **référence** pour l'implémentation BDD en environnement Angular/Java. 

**Pour commencer :**
1. 🍴 Forkez le projet
2. 📖 Consultez la [documentation](docs/)
3. 🧪 Ajoutez vos propres scénarios
4. 📤 Proposez vos améliorations

---

*Projet créé pour démontrer les bonnes pratiques BDD dans le développement full-stack moderne* 🚀