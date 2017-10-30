/**
 * @fileoverview Eslint rules for CodeceptJS
 * @author Peter Onneby
 */
"use strict";

module.exports = {
  environments: {
    codeceptjs: {
      globals: {
        actor: false,
        Feature: false,
        Scenario: false,
        Before: false,
        After: false,
        BeforeSuite: false,
        AfterSuite: false,
        within: false
      },
    }
  },
  rules: {
    "no-actor-in-scenario": require("./lib/rules/no-actor-in-scenario")
  }
}

