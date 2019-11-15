'use strict';

function isPauseCalled(callee){
  return callee.type === 'Identifier' && callee.name === 'pause'; 
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
      pausedTest: 'Unexpected pause in test'
    },
    schema: []
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        if (isPauseCalled(node.callee)) {
          context.report({
            node: node,
            messageId: 'pausedTest',
            fix: function (fixer) {
              var start = node.callee.range[0];
              var end = node.callee.range[1] + 2;
              return fixer.removeRange([start, end])
            }
          });
        }
      }
    };
  },
}
