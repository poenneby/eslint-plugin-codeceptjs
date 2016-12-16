/**
 * @fileoverview Eslint rules for CodeceptJS
 * @author Peter Onneby
 */
"use strict";

module.exports.environments = {
  codeceptjs: {
    globals: {
      actor: false,
      Feature: false,
      Scenario: false,
      Before: false,
      After: false,
      within: false
    }
  }
}

