'use strict';

module.exports = {
  meta: {
    docs: {
      description: '',
      category: 'Best Practices',
      recommended: true
    },
    fixable: "code",
    messages: {
      skippedTest: 'Unexpected skipped test'
    },
    schema: []
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (node.callee.name === 'xScenario') {
          context.report({
            node: node,
            messageId: 'skippedTest',
            fix: function (fixer) {
              return fixer.replaceTextRange(node.callee.range, 'Scenario');
            }
          });
        }
      },
      MemberExpression: function (node) {
        var obj = node.object;
        var prop = node.property;
        if (obj.name === 'Scenario' && prop.name === 'skip') {
          context.report({
            node: node,
            messageId: 'skippedTest'
          });
        }
      }
    };
  },
};
