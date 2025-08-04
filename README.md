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

## Contribution

Ce projet est conçu comme une référence pour l'implémentation du BDD dans un contexte full-stack moderne. Les contributions pour améliorer les exemples ou ajouter de nouvelles fonctionnalités sont les bienvenues.