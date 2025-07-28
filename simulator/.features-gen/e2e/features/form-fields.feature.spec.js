// Generated from: e2e/features/form-fields.feature
import { test } from "playwright-bdd";

test.describe('Dynamic Form Fields', () => {

  test.beforeEach('Background', async ({ Given, page }) => {
    await Given('I am on the simulator page', null, { page }); 
  });
  
  test('Assurance-Vie hides revenue field', async ({ When, page, And, Then, But }) => { 
    await When('I select the "Assurance-Vie" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await Then('I should see the "age" field', null, { page }); 
    await And('I should see the "capital" field', null, { page }); 
    await And('I should see the "versementsMensuels" field', null, { page }); 
    await But('I should not see the "revenus" field', null, { page }); 
  });

  test('Rente Viagère hides monthly payments', async ({ When, page, And, Then, But }) => { 
    await When('I select the "Rente Viagère" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await Then('I should see the "age" field', null, { page }); 
    await And('I should see the "capital" field', null, { page }); 
    await But('I should not see the "revenus" field', null, { page }); 
    await And('I should not see the "versementsMensuels" field', null, { page }); 
  });

  test('Madelin forces TNS status', async ({ When, page, And, Then }) => { 
    await When('I select the "Contrat Madelin" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await Then('the "statut" field should have value "tns"', null, { page }); 
    await And('the "statut" field should be disabled', null, { page }); 
  });

  test('PER shows all fields', async ({ When, page, And, Then }) => { 
    await When('I select the "PER Individuel" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await Then('I should see all these fields:', {"dataTable":{"rows":[{"cells":[{"value":"age"}]},{"cells":[{"value":"sexe"}]},{"cells":[{"value":"statut"}]},{"cells":[{"value":"revenus"}]},{"cells":[{"value":"capital"}]},{"cells":[{"value":"versementsMensuels"}]}]}}, { page }); 
  });

  test('Product-specific help messages', async ({ When, page, And, Then }) => { 
    await When('I select the "Assurance-Vie" product', null, { page }); 
    await And('I click "Continuer avec ce produit"', null, { page }); 
    await Then('I should see the help message "L\'assurance-vie n\'est pas soumise aux plafonds de revenus"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: ({}, use) => use(test),
  $uri: ({}, use) => use('e2e/features/form-fields.feature'),
  $bddFileData: ({}, use) => use(bddFileData),
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":9,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":10,"keywordType":"Action","textWithKeyword":"When I select the \"Assurance-Vie\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Assurance-Vie\"","children":[{"start":14,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":13,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then I should see the \"age\" field","stepMatchArguments":[{"group":{"start":17,"value":"\"age\"","children":[{"start":18,"value":"age","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":14,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And I should see the \"capital\" field","stepMatchArguments":[{"group":{"start":17,"value":"\"capital\"","children":[{"start":18,"value":"capital","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And I should see the \"versementsMensuels\" field","stepMatchArguments":[{"group":{"start":17,"value":"\"versementsMensuels\"","children":[{"start":18,"value":"versementsMensuels","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"But I should not see the \"revenus\" field","stepMatchArguments":[{"group":{"start":21,"value":"\"revenus\"","children":[{"start":22,"value":"revenus","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":19,"pickleLine":17,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":20,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I select the \"Rente Viagère\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Rente Viagère\"","children":[{"start":14,"value":"Rente Viagère","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":22,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then I should see the \"age\" field","stepMatchArguments":[{"group":{"start":17,"value":"\"age\"","children":[{"start":18,"value":"age","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"And I should see the \"capital\" field","stepMatchArguments":[{"group":{"start":17,"value":"\"capital\"","children":[{"start":18,"value":"capital","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":22,"keywordType":"Outcome","textWithKeyword":"But I should not see the \"revenus\" field","stepMatchArguments":[{"group":{"start":21,"value":"\"revenus\"","children":[{"start":22,"value":"revenus","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":23,"keywordType":"Outcome","textWithKeyword":"And I should not see the \"versementsMensuels\" field","stepMatchArguments":[{"group":{"start":21,"value":"\"versementsMensuels\"","children":[{"start":22,"value":"versementsMensuels","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":28,"pickleLine":25,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":26,"keywordType":"Action","textWithKeyword":"When I select the \"Contrat Madelin\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Contrat Madelin\"","children":[{"start":14,"value":"Contrat Madelin","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":27,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":28,"keywordType":"Outcome","textWithKeyword":"Then the \"statut\" field should have value \"tns\"","stepMatchArguments":[{"group":{"start":4,"value":"\"statut\"","children":[{"start":5,"value":"statut","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"},{"group":{"start":37,"value":"\"tns\"","children":[{"start":38,"value":"tns","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":29,"keywordType":"Outcome","textWithKeyword":"And the \"statut\" field should be disabled","stepMatchArguments":[{"group":{"start":4,"value":"\"statut\"","children":[{"start":5,"value":"statut","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":35,"pickleLine":31,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":32,"keywordType":"Action","textWithKeyword":"When I select the \"PER Individuel\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"PER Individuel\"","children":[{"start":14,"value":"PER Individuel","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then I should see all these fields:","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":42,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given I am on the simulator page","isBg":true,"stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"When I select the \"Assurance-Vie\" product","stepMatchArguments":[{"group":{"start":13,"value":"\"Assurance-Vie\"","children":[{"start":14,"value":"Assurance-Vie","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":43,"gherkinStepLine":44,"keywordType":"Action","textWithKeyword":"And I click \"Continuer avec ce produit\"","stepMatchArguments":[{"group":{"start":8,"value":"\"Continuer avec ce produit\"","children":[{"start":9,"value":"Continuer avec ce produit","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":45,"keywordType":"Outcome","textWithKeyword":"Then I should see the help message \"L'assurance-vie n'est pas soumise aux plafonds de revenus\"","stepMatchArguments":[{"group":{"start":30,"value":"\"L'assurance-vie n'est pas soumise aux plafonds de revenus\"","children":[{"start":31,"value":"L'assurance-vie n'est pas soumise aux plafonds de revenus","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end