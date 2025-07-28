Feature: Dynamic Form Fields
  As a user
  I want to see only relevant fields for my selected product
  So that I can fill in the appropriate information

  Background:
    Given I am on the simulator page

  Scenario: Assurance-Vie hides revenue field
    When I select the "Assurance-Vie" product
    And I click "Continuer avec ce produit"
    Then I should see the "age" field
    And I should see the "capital" field
    And I should see the "versementsMensuels" field
    But I should not see the "revenus" field

  Scenario: Rente Viagère hides monthly payments
    When I select the "Rente Viagère" product
    And I click "Continuer avec ce produit"
    Then I should see the "age" field
    And I should see the "capital" field
    But I should not see the "revenus" field
    And I should not see the "versementsMensuels" field

  Scenario: Madelin forces TNS status
    When I select the "Contrat Madelin" product
    And I click "Continuer avec ce produit"
    Then the "statut" field should have value "tns"
    And the "statut" field should be disabled

  Scenario: PER shows all fields
    When I select the "PER Individuel" product
    And I click "Continuer avec ce produit"
    Then I should see all these fields:
      | age                |
      | sexe               |
      | statut             |
      | revenus            |
      | capital            |
      | versementsMensuels |
      | ageRetraite        |
      | tauxRendement      |

  Scenario: Product-specific help messages
    When I select the "Assurance-Vie" product
    And I click "Continuer avec ce produit"
    Then I should see the help message "L'assurance-vie n'est pas soumise aux plafonds de revenus"