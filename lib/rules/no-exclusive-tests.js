'use strict';

function isOnlyMethodCall(callee) {
  return callee.type === 'MemberExpression' &&
      callee.object.name === 'Scenario' &&
      callee.property.name === 'only';
}


function isOnlyDataCall(callee) {    
  return callee.type === 'MemberExpression' &&
  callee.object && callee.object.object && callee.object.object.callee && callee.object.object.callee.name === "Data" &&
      callee.object && callee.object.property && callee.object.property.name === 'only';
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
        } else if (isOnlyDataCall(node.callee)) {
          context.report({
            node: node,
            messageId: 'exclusiveTest',
            fix: function (fixer) {
              var start = node.callee.object.object.callee.parent.end;
              var end = node.callee.object.property.end;
              return fixer.removeRange([start, end])
            }
          });
        }
      }
    };
  },
};
