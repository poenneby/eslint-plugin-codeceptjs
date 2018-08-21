'use strict';

var rule = require('../../../lib/rules/no-actor-in-scenario');
var actorMethods = require('../../../lib/rules/actorMethods');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester({"parserOptions": { "ecmaVersion": 8 }});

function invalidScenarios(functionStyle, hasAwait) {
  var invalidScenarios = actorMethods.map(function(actorMethod) {
    let awaitString = hasAwait ? "await" : "";
    return {
      code: `Scenario('My scenario', ${functionStyle} { ${awaitString} I.${actorMethod}(); let x = ${awaitString} I.${actorMethod}(); });`,
      errors: [{
        message: "Do not use actor in Scenario, prefer delegating to page objects"
      }]
    };
  });
  return invalidScenarios;
}

ruleTester.run("no-actor-in-scenario", rule, {
  valid: [
    "Before(function(I) { I.amOnPage() }); Scenario('My scenario', function(Page) { Page.submit() });",
    "Before(function(I) { I.amOnPage() }); Scenario('My scenario', async function(Page) { await Page.submit() });"
  ],
  invalid: invalidScenarios("function(I)").concat(invalidScenarios("async function(I)", true))
    .concat(invalidScenarios("(I) =>")).concat(invalidScenarios("async (I) =>", true))
});

