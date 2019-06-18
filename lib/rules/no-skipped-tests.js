'use strict';

function isSkipMethodCall(callee) {
  return callee.type === 'MemberExpression' &&
      callee.object.name === 'Scenario' &&
      callee.property.name === 'skip';
}

module.exports = {
  meta: {
    docs: {
      description: '',
      category: 'Best Practices',
      recommended: true
    },
    fixable: 'code',
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
              var start = node.callee.range[0];
              return fixer.removeRange([start, start + 1]);
            }
          });
        } else if (isSkipMethodCall(node.callee)) {
          context.report({
            node: node,
            messageId: 'skippedTest',
            fix: function (fixer) {
              var start = node.callee.object.range[1];
              var end = node.callee.range[1];
              return fixer.removeRange([start, end])
            }
          });
        }
      }
    };
  },
};
