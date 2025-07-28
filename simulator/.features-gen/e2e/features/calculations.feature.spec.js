// Generated from: e2e/features/calculations.feature
import { test } from "playwright-bdd";

test.describe('Product Calculations', () => {

  test.beforeEach('Background', async ({ Given, page }) => {
    await Given('I am on the simulator page', null, { page }); 
  });
  
  test('Calculate Assurance-Vie investment', async ({ When, page, And, Then }) => { 
    await When('I select the "Assurance-Vie" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await And('I fill the form with:', {"dataTable":{"rows":[{"cells":[{"value":"age"},{"value":"35"}]},{"cells":[{"value":"sexe"},{"value":"H"}]},{"cells":[{"value":"statut"},{"value":"salarie"}]},{"cells":[{"value":"capital"},{"value":"10000"}]},{"cells":[{"value":"versementsMensuels"},{"value":"200"}]},{"cells":[{"value":"dureeInvestissement"},{"value":"10"}]},{"cells":[{"value":"tauxRendement"},{"value":"2.5"}]}]}}, { page }); 
    await And('I click "Calculer"', null, { page }); 
    await Then('I should see the results page', null, { page }); 
    await And('I should see "Capital final estimé"', null, { page }); 
    await And('the result amount should be greater than "34000"', null, { page }); 
    await And('I should see a chart', null, { page }); 
  });

  test('Calculate PER with tax benefits', async ({ When, page, And, Then }) => { 
    await When('I select the "PER Individuel" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await And('I fill the form with:', {"dataTable":{"rows":[{"cells":[{"value":"age"},{"value":"35"}]},{"cells":[{"value":"sexe"},{"value":"H"}]},{"cells":[{"value":"statut"},{"value":"salarie"}]},{"cells":[{"value":"revenus"},{"value":"40000"}]},{"cells":[{"value":"capital"},{"value":"5000"}]},{"cells":[{"value":"versementsMensuels"},{"value":"300"}]},{"cells":[{"value":"ageRetraite"},{"value":"62"}]},{"cells":[{"value":"tauxRendement"},{"value":"3.0"}]}]}}, { page }); 
    await And('I click "Calculer"', null, { page }); 
    await Then('I should see the results page', null, { page }); 
    await And('I should see "Capital à la retraite" in the summary', null, { page }); 
    await And('I should see "Économie d\'impôt annuelle" in the summary', null, { page }); 
  });

  test('Calculate Rente Viagère conversion', async ({ When, page, And, Then }) => { 
    await When('I select the "Rente Viagère" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await And('I fill the form with:', {"dataTable":{"rows":[{"cells":[{"value":"age"},{"value":"65"}]},{"cells":[{"value":"sexe"},{"value":"H"}]},{"cells":[{"value":"statut"},{"value":"retraite"}]},{"cells":[{"value":"capital"},{"value":"100000"}]},{"cells":[{"value":"tauxReversion"},{"value":"60"}]},{"cells":[{"value":"ageConjoint"},{"value":"62"}]}]}}, { page }); 
    await And('I click "Calculer"', null, { page }); 
    await Then('I should see the results page', null, { page }); 
    await And('I should see "Rente annuelle" in the summary', null, { page }); 
    await And('I should see "Rente mensuelle" in the summary', null, { page }); 
    await And('I should see "Rente de réversion" in the summary', null, { page }); 
  });

  test('Default values enable calculation', async ({ When, page, And, Then }) => { 
    await When('I select the "Assurance-Vie" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await And('I click "Calculer"', null, { page }); 
    await Then('I should see the results page', null, { page }); 
    await And('I should see "Capital final estimé"', null, { page }); 
  });

  test('Reset simulation', async ({ Given, page, When, Then, And }) => { 
    await Given('I have completed a calculation for "Assurance-Vie"', null, { page }); 
    await When('I click "Nouvelle simulation"', null, { page }); 
    await Then('I should be on step 1', null, { page }); 
    await And('no product should be selected', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('e2e/features/calculations.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I select the \"Assurance-Vie\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Assurance-Vie\"","children":[{"start":14,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"And I fill the form with:","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And I click \"Calculer\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Calculer\"","children":[{"start":9,"value":"Calculer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then I should see the results page","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"And I should see \"Capital final estimé\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Capital final estimé\"","children":[{"start":14,"value":"Capital final estimé","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And the result amount should be greater than \"34000\"","stepMatchArguments":[{"group":{"start":41,"value":"\"34000\"","children":[{"start":42,"value":"34000","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":24,"keywordType":"Outcome","textWithKeyword":"And I should see a chart","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":26,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"When I select the \"PER Individuel\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"PER Individuel\"","children":[{"start":14,"value":"PER Individuel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":28,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"And I fill the form with:","stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":38,"keywordType":"Action","textWithKeyword":"And I click \"Calculer\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Calculer\"","children":[{"start":9,"value":"Calculer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":39,"keywordType":"Outcome","textWithKeyword":"Then I should see the results page","stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":40,"keywordType":"Outcome","textWithKeyword":"And I should see \"Capital à la retraite\" in the summary","stepMatchArguments":[{"group":{"start":13,"value":"\"Capital à la retraite\"","children":[{"start":14,"value":"Capital à la retraite","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":41,"keywordType":"Outcome","textWithKeyword":"And I should see \"Économie d'impôt annuelle\" in the summary","stepMatchArguments":[{"group":{"start":13,"value":"\"Économie d'impôt annuelle\"","children":[{"start":14,"value":"Économie d'impôt annuelle","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":31,"pickleLine":43,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":32,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"When I select the \"Rente Viagère\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Rente Viagère\"","children":[{"start":14,"value":"Rente Viagère","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":45,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":34,"gherkinStepLine":46,"keywordType":"Action","textWithKeyword":"And I fill the form with:","stepMatchArguments":[]},{"pwStepLine":35,"gherkinStepLine":53,"keywordType":"Action","textWithKeyword":"And I click \"Calculer\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Calculer\"","children":[{"start":9,"value":"Calculer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":36,"gherkinStepLine":54,"keywordType":"Outcome","textWithKeyword":"Then I should see the results page","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":55,"keywordType":"Outcome","textWithKeyword":"And I should see \"Rente annuelle\" in the summary","stepMatchArguments":[{"group":{"start":13,"value":"\"Rente annuelle\"","children":[{"start":14,"value":"Rente annuelle","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":56,"keywordType":"Outcome","textWithKeyword":"And I should see \"Rente mensuelle\" in the summary","stepMatchArguments":[{"group":{"start":13,"value":"\"Rente mensuelle\"","children":[{"start":14,"value":"Rente mensuelle","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":57,"keywordType":"Outcome","textWithKeyword":"And I should see \"Rente de réversion\" in the summary","stepMatchArguments":[{"group":{"start":13,"value":"\"Rente de réversion\"","children":[{"start":14,"value":"Rente de réversion","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":42,"pickleLine":59,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":60,"keywordType":"Action","textWithKeyword":"When I select the \"Assurance-Vie\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Assurance-Vie\"","children":[{"start":14,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":61,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":45,"gherkinStepLine":62,"keywordType":"Action","textWithKeyword":"And I click \"Calculer\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Calculer\"","children":[{"start":9,"value":"Calculer","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":46,"gherkinStepLine":63,"keywordType":"Outcome","textWithKeyword":"Then I should see the results page","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":64,"keywordType":"Outcome","textWithKeyword":"And I should see \"Capital final estimé\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Capital final estimé\"","children":[{"start":14,"value":"Capital final estimé","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":50,"pickleLine":66,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":51,"gherkinStepLine":67,"keywordType":"Context","textWithKeyword":"Given I have completed a calculation for \"Assurance-Vie\"","stepMatchArguments":[{"group":{"start":35,"value":"\"Assurance-Vie\"","children":[{"start":36,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":52,"gherkinStepLine":68,"keywordType":"Action","textWithKeyword":"When I click \"Nouvelle simulation\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Nouvelle simulation\"","children":[{"start":9,"value":"Nouvelle simulation","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":53,"gherkinStepLine":69,"keywordType":"Outcome","textWithKeyword":"Then I should be on step 1","stepMatchArguments":[{"group":{"start":20,"value":"1","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":54,"gherkinStepLine":70,"keywordType":"Outcome","textWithKeyword":"And no product should be selected","stepMatchArguments":[]}]},
]; // bdd-data-end