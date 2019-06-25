'use strict';

var RuleTester = require('eslint').RuleTester;

var rule = require('../../../lib/rules/no-exclusive-tests');

var ruleTester = new RuleTester();

function invalidScenario (code) {
  return {
    code: code,
    parserOptions: { ecmaVersion: 6 },
    errors: [
      { message: 'Unexpected exclusive test' }
    ],
    output: 'Scenario("this is not", function () {});'
  };
}

ruleTester.run('no-exclusive-tests', rule, {
  valid: [
    'Scenario("this is cool", function () {});'
  ],
  invalid: [
    invalidScenario('Scenario.only("this is not", function () {});')
  ],
});
