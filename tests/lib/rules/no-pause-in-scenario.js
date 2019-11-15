'use strict';

var RuleTester = require('eslint').RuleTester;

var rule = require('../../../lib/rules/no-pause-in-scenario');

var ruleTester = new RuleTester();

function invalidScenario(input, output) {
  return {
    code: input,
    parserOptions: { ecmaVersion: 6 },
    errors: [
      { message: 'Unexpected pause in test' }
    ],
    output: output
  };
}

ruleTester.run('no-pause-in-scenario', rule, {
  valid: [
    'Scenario("this is cool", function () {});'
  ],
  invalid: [
    invalidScenario(
        'Scenario("this is not", function () {pause()});',
	'Scenario("this is not", function () {});'
    ),
    invalidScenario(
        'Scenario("nor is this", function () {pause()});',
	'Scenario("nor is this", function () {});'
    )
  ],
});
