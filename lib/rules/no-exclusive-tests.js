'use strict';

function isOnlyMethodCall(callee) {
  return callee.type === 'MemberExpression' &&
      callee.object.name === 'Scenario' &&
      callee.property.name === 'only';
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
      exclusiveTest: 'Unexpected exclusive test'
    },
    schema: []
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (isOnlyMethodCall(node.callee)) {
          context.report({
            node: node,
            messageId: 'exclusiveTest',
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
