/**
 * @fileoverview Eslint rules for CodeceptJS
 * @author Peter Onneby
 */
"use strict";

module.exports.environments = {
  codeceptjs: {
    globals: {
      Scenario: false,
      Feature: false,
      actor: false,
      Before: false
    }
  }
}

