// Generated from: e2e/features/product-selection.feature
import { test } from "playwright-bdd";

test.describe('Product Selection', () => {

  test.beforeEach('Background', async ({ Given, page }) => {
    await Given('I am on the simulator page', null, { page }); 
  });
  
  test('View all available products', async ({ Then, page, And }) => { 
    await Then('I should see 4 insurance products', null, { page }); 
    await And('I should see the following products:', {"dataTable":{"rows":[{"cells":[{"value":"Assurance-Vie"}]},{"cells":[{"value":"PER Individuel"}]},{"cells":[{"value":"Contrat Madelin"}]},{"cells":[{"value":"Rente Viagère"}]}]}}, { page }); 
  });

  test('Select Assurance-Vie product', async ({ When, page, Then, And }) => { 
    await When('I select the "Assurance-Vie" product', null, { page }); 
    await Then('the "Assurance-Vie" product should be highlighted', null, { page }); 
    await And('the continue button should be enabled', null, { page }); 
  });

  test('Product features are displayed', async ({ Then, page }) => { 
    await Then('the "Assurance-Vie" product should show these features:', {"dataTable":{"rows":[{"cells":[{"value":"Fonds euros garantis"}]},{"cells":[{"value":"Unités de compte"}]},{"cells":[{"value":"Fiscalité avantageuse"}]},{"cells":[{"value":"Transmission facilitée"}]}]}}, { page }); 
  });

  test('Navigate to parameters after product selection', async ({ When, page, And, Then }) => { 
    await When('I select the "PER Individuel" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await Then('I should be on step 2', null, { page }); 
    await And('I should see "Vos informations personnelles"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('e2e/features/product-selection.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then I should see 4 insurance products","stepMatchArguments":[{"group":{"start":13,"value":"4","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Outcome","textWithKeyword":"And I should see the following products:","stepMatchArguments":[]}]},
  {"pwTestLine":15,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I select the \"Assurance-Vie\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Assurance-Vie\"","children":[{"start":14,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then the \"Assurance-Vie\" product should be highlighted","stepMatchArguments":[{"group":{"start":4,"value":"\"Assurance-Vie\"","children":[{"start":5,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And the continue button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"Then the \"Assurance-Vie\" product should show these features:","stepMatchArguments":[{"group":{"start":4,"value":"\"Assurance-Vie\"","children":[{"start":5,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":25,"pickleLine":29,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":26,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When I select the \"PER Individuel\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"PER Individuel\"","children":[{"start":14,"value":"PER Individuel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":28,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then I should be on step 2","stepMatchArguments":[{"group":{"start":20,"value":"2","children":[]},"parameterTypeName":"int"}]},{"pwStepLine":29,"gherkinStepLine":33,"keywordType":"Outcome","textWithKeyword":"And I should see \"Vos informations personnelles\"","stepMatchArguments":[{"group":{"start":13,"value":"\"Vos informations personnelles\"","children":[{"start":14,"value":"Vos informations personnelles","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end