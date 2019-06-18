'use strict';

module.exports = {
  meta: {
    docs: {
      description: '',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      disabledTest: 'Disabled test'
    },
    schema: []
  },
  create: function (context) {
    return {
      CallExpression: function (node) {
        var callee = node.callee;
        if (callee.name === 'xScenario') {
          context.report({
            node: node,
            messageId: 'disabledTest'
          });
        }
      },
      MemberExpression: function (node) {
        var obj = node.object;
        var prop = node.property;
        if (obj.name === 'Scenario' && prop.name === 'skip') {
          context.report({
            node: node,
            messageId: 'disabledTest'
          });
        }
      }
    };
  },
};
