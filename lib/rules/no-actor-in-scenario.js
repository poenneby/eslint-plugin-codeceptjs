'use strict';

var actorMethods = require('./actorMethods');

var REPORT_MESSAGE = 'Do not use actor in Scenario, prefer delegating to page objects';

module.exports = {
  meta: {
    docs: {
      description: "disallow the use of Actor directly in Scenarios in favor of page objects",
      category: "Best Practices",
      recommended: true
    },
    schema: [] // no options
  },
  create: function(context) {
    return {
      CallExpression: function(node) {
        var callee = node.callee;
        if (callee.name === 'Scenario') {
          node.arguments.map(function(argument) {
            if (argument.type === 'FunctionExpression' ||
              argument.type === 'ArrowFunctionExpression' &&
              argument.body &&
              argument.body.body
            ) {
              argument.body.body.map(function(expressionStatement) {
                if (expressionStatement.expression) {
                  let exp = expressionStatement.expression;
                  if (exp.type === 'AssignmentExpression') {
                    exp = exp.right;
                  }
                  if (exp.type === 'AwaitExpression') {
                    exp = exp.argument;
                  }
                  actorMethods.map(function(actorMethod) {
                    if (exp.callee.property.name === actorMethod) {
                      context.report({
                        node: exp,
                        message: REPORT_MESSAGE
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }
    };
  }
}

