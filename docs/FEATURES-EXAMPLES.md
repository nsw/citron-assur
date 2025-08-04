# Exemples de Features BDD

Collection complète des scénarios Gherkin pour le projet Citron-Assur.

## Feature: Gestion des Produits d'Assurance

`tests/features/products-management.feature` :
```gherkin
Feature: Insurance products management
  As a Citron-Assur user
  I want to browse and filter insurance products
  So that I can find the product that matches my needs

  Background:
    Given I am on the Citron-Assur homepage

  Scenario: Display all products grouped by type
    When I view the product list
    Then I see 6 product categories
    And each category is represented by a distinctive icon
    And I can see the number of products in each category

  Scenario: View product details
    Given I see the "Life Insurance" product list
    When I click on product "Netissima Plus"
    Then a modal window opens
    And I see the detailed product information
    And I can navigate between "Information", "Details" and "JSON" tabs

  Scenario Outline: Filter by product type
    When I expand the category "<product_type>"
    Then I see <count> products in this category
    And each product displays its commercial name
    And each product displays its identifier

    Examples:
      | product_type            | count |
      | Life Insurance          | 3     |
      | Individual PER          | 3     |
      | Madelin Contract        | 3     |
      | Capitalization Contract | 3     |
      | Mixed Protection        | 3     |
      | Life Annuity            | 3     |
```

## Feature: Validation des Données Produits

`tests/features/product-validation.feature` :
```gherkin
Feature: Product data validation
  Insurance products must comply with certain business rules

  Rule: All products must have mandatory information

    Scenario: Verify mandatory fields
      Given a product of type "Life Insurance"
      Then the product should have a "commercial_name"
      And the product should have a unique "id"
      And the product should have a valid "type"
      And the product should have a non-empty "data" object

  Rule: Life insurance products have specific fees

    Scenario: Validate life insurance fees
      Given the product "Netissima Plus" of type "Life Insurance"
      Then management fees should be between 0% and 5%
      And entry fees should be between 0% and 10%
      And arbitrage fees should be defined
```

## Feature: Interface Utilisateur

`tests/features/ui-behavior.feature` :
```gherkin
@ui
Feature: User interface behavior
  The interface should be intuitive and responsive

  @critical
  Scenario: Main navigation
    Given I am on the homepage
    Then I see the Citron-Assur logo with animation
    And I see the "Citron-Assur" title
    And I see the explanatory subtitle

  Scenario: Panel interactions
    Given I see the product categories
    When I hover over a category
    Then the appearance changes to indicate interactivity
    And I see a smooth transition effect

  Scenario: Opening product details
    Given a product list is displayed
    When I click anywhere on a product row
    Then the details modal opens
    And I see a chevron icon indicating navigation
```

## Feature: API Backend

`tests/features/api/products-api.feature` :
```gherkin
@api
Feature: Insurance products API
  The API should provide product data reliably

  @smoke
  Scenario: API available
    When I call GET "/api/products"
    Then I receive a 200 status
    And the response contains a list of products

  Scenario Outline: Retrieve by type
    When I call GET "/api/products/<type>"
    Then I receive a 200 status
    And all returned products are of type "<type>"
    And I receive exactly <count> products

    Examples:
      | type                   | count |
      | assurance-vie          | 3     |
      | per-individuel         | 3     |
      | contrat-madelin        | 3     |

  Scenario: Specific product
    When I call GET "/api/products/assurance-vie/AV001"
    Then I receive a 200 status
    And the returned product has id "AV001"
    And the product has type "assurance-vie"

  Scenario: Non-existent product
    When I call GET "/api/products/assurance-vie/NONEXISTENT"
    Then I receive a 404 status
```

## Feature: Performance et Qualité

`tests/features/performance.feature` :
```gherkin
@performance
Feature: Application performance
  The application should be fast and responsive

  Scenario: Initial loading time
    When I load the homepage
    Then the page loads in less than 2 seconds
    And products display in less than 3 seconds

  Scenario: Interaction responsiveness
    Given I am on the products page
    When I click on a product
    Then the modal opens in less than 500ms
    And data loads in less than 1 second
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
Scenario: Product validation with tabular data
  Given the following products:
    | name            | type           | management_fee | status |
    | Netissima Plus  | assurance-vie  | 0.6           | active |
    | Linxea Avenir   | assurance-vie  | 0.5           | active |
    | PER Epsens      | per-individuel | 0.8           | active |
  When I validate each product
  Then all products comply with business rules
```