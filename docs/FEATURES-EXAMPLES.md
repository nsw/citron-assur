# Exemples de Features BDD

Collection complète des scénarios Gherkin pour le projet Citron-Assur.

## Feature: Gestion des Produits d'Assurance

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

## Feature: Validation des Données Produits

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

## Feature: Interface Utilisateur

`tests/features/ui-behavior.feature` :
```gherkin
# language: fr
@ui
Fonctionnalité: Comportement de l'interface utilisateur
  L'interface doit être intuitive et responsive

  @critical
  Scénario: Navigation principale
    Étant donné que je suis sur la page d'accueil
    Alors je vois le logo Citron-Assur avec animation
    Et je vois le titre "Citron-Assur"
    Et je vois le sous-titre explicatif

  Scénario: Interactions avec les panneaux
    Étant donné que je vois les catégories de produits
    Quand je survole une catégorie
    Alors l'apparence change pour indiquer l'interactivité
    Et je vois un effet de transition fluide

  Scénario: Ouverture des détails produit
    Étant donné une liste de produits affichée
    Quand je clique n'importe où sur une ligne de produit
    Alors le modal de détails s'ouvre
    Et je vois une icône chevron qui indique la navigation
```

## Feature: API Backend

`tests/features/api/products-api.feature` :
```gherkin
# language: fr
@api
Fonctionnalité: API des produits d'assurance
  L'API doit fournir les données des produits de manière fiable

  @smoke
  Scénario: API disponible
    Quand j'appelle GET "/api/products"
    Alors je reçois un statut 200
    Et la réponse contient une liste de produits

  Plan du scénario: Récupération par type
    Quand j'appelle GET "/api/products/<type>"
    Alors je reçois un statut 200
    Et tous les produits retournés sont de type "<type>"
    Et je reçois exactement <nombre> produits

    Exemples:
      | type                   | nombre |
      | assurance-vie          | 3      |
      | per-individuel         | 3      |
      | contrat-madelin        | 3      |

  Scénario: Produit spécifique
    Quand j'appelle GET "/api/products/assurance-vie/AV001"
    Alors je reçois un statut 200
    Et le produit retourné a l'id "AV001"
    Et le produit a le type "assurance-vie"

  Scénario: Produit inexistant
    Quand j'appelle GET "/api/products/assurance-vie/INEXISTANT"
    Alors je reçois un statut 404
```

## Feature: Performance et Qualité

`tests/features/performance.feature` :
```gherkin
# language: fr
@performance
Fonctionnalité: Performance de l'application
  L'application doit être rapide et responsive

  Scénario: Temps de chargement initial
    Quand je charge la page d'accueil
    Alors la page se charge en moins de 2 secondes
    Et les produits s'affichent en moins de 3 secondes

  Scénario: Réactivité des interactions
    Étant donné que je suis sur la page des produits
    Quand je clique sur un produit
    Alors le modal s'ouvre en moins de 500ms
    Et les données se chargent en moins de 1 seconde
```

## Tags Utilisés

- `@critical` : Tests essentiels qui ne doivent jamais échouer
- `@api` : Tests de l'API backend
- `@ui` : Tests de l'interface utilisateur
- `@smoke` : Tests de base pour vérifier que l'application fonctionne
- `@regression` : Tests de non-régression
- `@performance` : Tests de performance
- `@slow` : Tests qui prennent du temps à s'exécuter

## Exemple d'Utilisation avec Tables

```gherkin
Scénario: Validation des produits avec données tabulaires
  Étant donné les produits suivants:
    | nom             | type           | frais_gestion | statut |
    | Netissima Plus  | assurance-vie  | 0.6          | actif  |
    | Linxea Avenir   | assurance-vie  | 0.5          | actif  |
    | PER Epsens      | per-individuel | 0.8          | actif  |
  Quand je valide chaque produit
  Alors tous les produits respectent les règles métier
```