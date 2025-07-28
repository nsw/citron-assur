Feature: Product Calculations
  As a user
  I want to calculate my insurance investment results
  So that I can make informed financial decisions

  Background:
    Given I am on the simulator page

  Scenario: Calculate Assurance-Vie investment
    When I select the "Assurance-Vie" product
    And I click "Continuer avec ce produit"
    And I fill the form with:
      | age                  | 35    |
      | sexe                 | H     |
      | statut               | salarie |
      | capital              | 10000 |
      | versementsMensuels   | 200   |
      | dureeInvestissement  | 10    |
      | tauxRendement        | 2.5   |
    And I click "Calculer"
    Then I should see the results page
    And I should see "Capital final estimé"
    And the result amount should be greater than "34000"
    And I should see a chart

  Scenario: Calculate PER with tax benefits
    When I select the "PER Individuel" product
    And I click "Continuer avec ce produit"
    And I fill the form with:
      | age                | 35     |
      | sexe               | H      |
      | statut             | salarie |
      | revenus            | 40000  |
      | capital            | 5000   |
      | versementsMensuels | 300    |
      | ageRetraite        | 62     |
      | tauxRendement      | 3.0    |
    And I click "Calculer"
    Then I should see the results page
    And I should see "Capital à la retraite" in the summary
    And I should see "Économie d'impôt annuelle" in the summary

  Scenario: Calculate Rente Viagère conversion
    When I select the "Rente Viagère" product
    And I click "Continuer avec ce produit"
    And I fill the form with:
      | age            | 65   |
      | sexe           | H    |
      | statut         | retraite |
      | capital        | 100000 |
      | tauxReversion  | 60   |
      | ageConjoint    | 62   |
    And I click "Calculer"
    Then I should see the results page
    And I should see "Rente annuelle" in the summary
    And I should see "Rente mensuelle" in the summary
    And I should see "Rente de réversion" in the summary

  Scenario: Validation prevents calculation with missing fields
    When I select the "Assurance-Vie" product
    And I click "Continuer avec ce produit"
    And I fill the form with:
      | age | 35 |
    Then I should see an error message

  Scenario: Reset simulation
    Given I have completed a calculation for "Assurance-Vie"
    When I click "Nouvelle simulation"
    Then I should be on step 1
    And no product should be selected