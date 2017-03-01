'use strict';

var rule = require('../../../lib/rules/no-actor-in-scenario');
var actorMethods = require('../../../lib/rules/actorMethods');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();

function invalidScenarios(functionStyle) {
  var invalidScenarios = actorMethods.map(function(actorMethod) {
    return {
      code: `Scenario('My scenario', ${functionStyle} { I.${actorMethod}() })`,
      parserOptions: { ecmaVersion: 6 },
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
  ],
  invalid: invalidScenarios("function(I)").concat(invalidScenarios("(I) =>"))
});

