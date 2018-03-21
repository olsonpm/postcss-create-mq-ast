'use strict'

const cssTree = require('css-tree'),
  postcss = require('postcss')

module.exports = postcss.plugin('postcss-create-mq-ast', () => {
  return root => {
    root.walkAtRules('media', atRule => {
      const { params, source } = atRule,
        { column, line } = source.start

      atRule.preludeCssTreeAst = cssTree.parse(params, {
        atrule: 'media',
        column,
        context: 'atrulePrelude',
        filename: source.input.file,
        line,
        positions: true,
      })
    })
  }
})
