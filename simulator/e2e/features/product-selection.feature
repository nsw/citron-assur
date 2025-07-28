Feature: Product Selection
  As a user
  I want to select different insurance products
  So that I can calculate my investment options

  Background:
    Given I am on the simulator page

  Scenario: View all available products
    Then I should see 4 insurance products
    And I should see the following products:
      | Assurance-Vie    |
      | PER Individuel   |
      | Contrat Madelin  |
      | Rente Viagère    |

  Scenario: Select Assurance-Vie product
    When I select the "Assurance-Vie" product
    Then the "Assurance-Vie" product should be highlighted
    And the continue button should be enabled

  Scenario: Product features are displayed
    Then the "Assurance-Vie" product should show these features:
      | Fonds euros garantis      |
      | Unités de compte          |
      | Fiscalité avantageuse     |
      | Transmission facilitée    |

  Scenario: Navigate to parameters after product selection
    When I select the "PER Individuel" product
    And I click "Continuer avec ce produit"
    Then I should be on step 2
    And I should see "Vos informations personnelles"