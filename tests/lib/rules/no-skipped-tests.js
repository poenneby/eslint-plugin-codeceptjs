'use strict';

var RuleTester = require('eslint').RuleTester;

var rule = require('../../../lib/rules/no-skipped-tests');

var ruleTester = new RuleTester();

function invalidScenario(input, output) {
  return {
    code: input,
    parserOptions: { ecmaVersion: 6 },
    errors: [
      { message: 'Unexpected skipped test' }
    ],
    output: output
  };
}

ruleTester.run('no-skipped-tests', rule, {
  valid: [
    'Scenario("this is cool", function () {});'
  ],
  invalid: [
    invalidScenario(
        'xScenario("this is not", function () {});',
        'Scenario("this is not", function () {});'
    ),
    invalidScenario(
        'Scenario.skip("nor is this", function () {});',
        'Scenario("nor is this", function () {});'
    )
  ],
});
