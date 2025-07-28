# Système de Gestion des Produits d'Assurance Français

## Table des matières

1. [Introduction](#introduction)
2. [Analyse des produits financiers](#analyse-des-produits-financiers)
3. [Paramètres variables et structures de données](#paramètres-variables-et-structures-de-données)
4. [Fonctions de calcul](#fonctions-de-calcul)
5. [Tests BDD avec Cucumber](#tests-bdd-avec-cucumber)
6. [Application web de simulation](#application-web-de-simulation)
7. [Conclusion](#conclusion)

## Introduction

Ce document présente une analyse complète des produits financiers d'assurance en France et les spécifications techniques pour développer un système informatique de gestion. Le projet couvre l'ensemble des produits commercialisés par les assureurs français, leurs paramètres variables, les formules de calcul réglementaires et les outils de développement associés.

### Objectifs du projet

- **Centraliser** toutes les informations techniques des produits d'assurance français
- **Standardiser** les structures de données et paramètres variables
- **Automatiser** les calculs complexes avec des fonctions TypeScript
- **Valider** les fonctionnalités avec des tests BDD Cucumber
- **Démontrer** les capacités avec une application web de simulation

## Analyse des produits financiers

### Produits couverts

Le système gère l'ensemble des produits d'assurance commercialisés en France :

#### Assurance-vie

- **Fonds en euros** avec garantie en capital
- **Unités de compte** sans garantie mais avec potentiel de performance
- **Supports eurocroissance** combinant sécurité et performance
- **Garanties décès** et options de plancher
- **Fiscalité avantageuse** selon la durée de détention

#### Épargne retraite

- **Plan d'Épargne Retraite (PER)** individuel avec déductibilité fiscale
- **Contrats Madelin** pour les travailleurs non-salariés
- **Rentes viagères** avec options de réversion
- **Compartiments distincts** selon l'origine des fonds

#### Produits spécialisés

- **Contrats de capitalisation** pour les personnes morales
- **Prévoyance mixte** alliant décès et épargne
- **Produits dédiés** au financement de la dépendance

### Paramètres réglementaires 2025

Les calculs intègrent les dernières valeurs réglementaires :

- **PASS 2025** : 47 100 €
- **Taux moyens fonds euros** : 2,60%
- **Tables de mortalité** : TGHF05 (60% H, 40% F) pour les nouveaux contrats
- **Abattements fiscaux** : 152 500 € par bénéficiaire (art. 990 I)
- **Plafonds de déduction** : jusqu'à 87 135 € pour les TNS

## Paramètres variables et structures de données

### Paramètres communs à tous les produits

Chaque produit partage un socle commun de paramètres :

#### Identification et aspects contractuels

- Code produit unique et ISIN
- Nom commercial et assureur
- Dates de création et fin de commercialisation
- Statut (actif, suspendu, fermé)
- Distributeurs autorisés

#### Paramètres d'entrée

- Versements minimums (initial, programmés, libres)
- Contraintes d'âge (minimum/maximum)
- Montants maximums autorisés
- Conditions d'accès spécifiques

#### Structure des frais

- Frais d'entrée (pourcentage ou montant fixe)
- Frais de gestion annuels par support
- Frais d'arbitrage et nombre gratuit
- Frais de sortie et pénalités de rachat

### Paramètres spécifiques par produit

#### Assurance-vie : supports d'investissement

**Fonds en euros :**

- Taux technique garanti et participation aux bénéfices (minimum 85%)
- Composition d'actifs (obligations 87,5%, actions 7,5%, immobilier 3%)
- Contraintes réglementaires (TMG ≤ 75% du TME sur 8 ans)

**Unités de compte :**

- Classification SRI (Synthetic Risk Indicator) de 1 à 7
- Frais spécifiques par type d'UC (OPCVM, ETF, SCPI, private equity)
- Contraintes d'allocation minimum/maximum

**Eurocroissance :**

- Mécanisme de garantie à terme (minimum 8 ans)
- Évolution dynamique de l'allocation sécurisé/risqué
- Trois provisions distinctes (mathématique, diversification, garantie)

#### PER : compartiments et déductibilité

**Structure tripartite obligatoire :**

1. **Compartiment 1** : versements volontaires déductibles/non-déductibles
2. **Compartiment 2** : épargne salariale (participation, intéressement, abondement)
3. **Compartiment 3** : versements obligatoires (ex-article 83)

**Formules de déduction fiscale :**

- **Salariés** : MAX(10% × revenus N-1, 10% × PASS N-1)
- **TNS** : formule complexe avec tranche supplémentaire 15% au-delà du PASS
- **Reports** : cumul possible sur 3 ans avec ordre d'imputation chronologique

#### Rentes viagères : paramètres actuariels

**Tables de mortalité :**

- TGH05/TGF05 pour les rentes individuelles
- TGHF05 non-genrée pour les contrats collectifs (depuis nov. 2024)
- Taux technique maximum : 60% du TME moyen 6 mois

**Options de réversion :**

- Taux standards : 60%, 80%, 100%
- Réduction de la rente initiale : 8% à 20% selon le taux
- Indexation IPC avec clause de non-diminution

### Garanties et protections

#### Garanties décès

- Utilisation des tables TH00-02/TF00-02 ou TGHF05
- Coefficients de surprime selon âge, santé, profession
- Montants libres d'examen médical (généralement 300 000 €)

#### Garanties invalidité

- Trois niveaux : IPT (≥66%), IPP (33-66%), ITT (temporaire)
- Barèmes de référence (Concours Médical)
- Délais de franchise et conditions d'indemnisation

#### Garanties plancher

- Protection du capital en cas de décès prématuré
- Coût progressif selon l'âge (15 à 200 points de base)
- Calcul sur le capital sous risque

## Fonctions de calcul

### Typologie des fonctions développées

Le système comprend plus de 20 fonctions TypeScript couvrant tous les aspects calculatoires :

#### Assurance-vie

- **Participation aux bénéfices** : TMG + 85% des bénéfices nets
- **Frais d'entrée** : calculs proportionnels et fixes
- **Primes de garantie décès** : Capital × Qx × coefficients
- **Coût garantie plancher** : selon âge et capital sous risque

#### PER et Madelin

- **Plafonds de déduction** : formules différenciées salariés/TNS
- **Gestion des reports** : cumul sur 3 ans avec optimisation fiscale
- **Plafonds Madelin** : retraite, prévoyance/santé, perte d'emploi
- **Neutralisation Mad15** : éviter la double déduction

#### Rentes viagères

- **Coefficients actuariels** : calculs avec tables de mortalité
- **Rentes simples** : Capital ÷ coefficient actuariel
- **Rentes avec réversion** : impact des taux et réductions
- **Indexation** : revalorisation IPC avec clause de non-diminution

#### Fiscalité succession

- **Article 990 I** : taxation versements avant 70 ans (20% puis 31,25%)
- **Démembrement** : répartition usufruit/nue-propriété selon âge
- **Contrats de capitalisation** : régime plus-values mobilières

### Caractéristiques techniques

#### Types TypeScript stricts

- Interfaces complètes pour tous les paramètres
- Validation des entrées et gestion d'erreurs
- Documentation intégrée des formules

#### Paramètres réglementaires actualisés

- Valeurs 2025 (PASS, abattements, tables de mortalité)
- Contraintes réglementaires intégrées
- Évolutivité pour les mises à jour annuelles

#### Utilitaires et helpers

- Formatage monétaire français
- Calculs de rendements annualisés
- Validation des paramètres d'âge et de cohérence

## Tests BDD avec Cucumber

### Approche Behavior-Driven Development

L'ensemble des fonctions est couvert par des features Cucumber organisées par domaines fonctionnels, totalisant plus de 50 scénarios de test.

#### Structure des features

**Assurance-vie (4 features)**

- Participation aux bénéfices avec différents niveaux de bénéfices
- Calcul des frais avec cas standards et exceptions
- Primes de garantie décès avec coefficients de surprime par âge
- Coût des garanties plancher selon profils de souscripteurs

**PER et Madelin (4 features)**

- Plafonds PER salariés avec revenus variables et minimum garanti
- Plafonds PER TNS avec formule complexe et tranches multiples
- Plafonds Madelin par catégorie avec interdépendances
- Gestion des reports avec règles d'imputation chronologique

**Rentes viagères (4 features)**

- Coefficients actuariels selon âge, sexe et taux technique
- Rentes viagères simples avec comparaisons hommes/femmes
- Rentes avec réversion et impact des différents taux
- Indexation avec et sans clause de non-diminution

**Fiscalité et produits spécialisés (4 features)**

- Article 990 I avec toutes les tranches d'imposition
- Démembrement avec barème par âge de l'usufruitier
- Contrats de capitalisation et fiscalité des plus-values
- Eurocroissance et évolution des allocations

### Caractéristiques des tests

#### Scénarios réalistes

- Utilisation de valeurs de marché actuelles
- Cas d'usage représentatifs des pratiques commerciales
- Situations limites et cas d'erreur

#### Tables d'exemples paramétrées

- Scenario Outline pour les tests multiples
- Validation systématique des formules
- Couverture des cas exceptionnels

#### Terminologie métier précise

- Vocabulaire technique de l'assurance
- Référence aux articles réglementaires
- Contexte métier dans les Background