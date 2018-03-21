# Postcss - Create Media Query AST

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**
- [What is it](#what-is-it)
- [Install](#install)
- [Usage](#usage)
- [Why create it](#why-create-it)
- [Example](#example)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## What is it

This very simple plugin walks through media [AtRules](http://api.postcss.org/AtRule.html) and attaches the property `preludeCssTreeAst`. This property is an instance of [AtrulePrelude](https://github.com/csstree/csstree/blob/master/docs/ast.md#atruleprelude) and can be traversed via the apis made available by [csstree](https://github.com/csstree/csstree).


## Install

`npm install postcss-create-mq-ast`


## Usage

Just the same as any other postcss plugin

```js
const createMqAst = require('postcss-create-mq-ast')
postcss([createMqAst()])
  .process(...)
```


## Why create it

I needed an ast in order to create [postcss-remove-duplicate-mq](https://github.com/olsonpm/postcss-remove-duplicate-mq)

Postcss doesn't parse media queries and instead leaves them as a [params](http://api.postcss.org/AtRule.html#params)
property on the media [AtRule](http://api.postcss.org/AtRule.html)

There exists the [postcss-media-query-parser](https://www.npmjs.com/package/postcss-media-query-parser) but that doesn't use the exposed ast structures provided by postcss (possibly because they didn't exist when it was written). It also is outdated and not maintained.

I chose to use csstree's ast because postcss has plans to utilize csstree's parser down the road.


## Example

Given the following css

```css
/* test.css */

@media (min-width: 500px) {
  body {
    background-color: blue;
  }
}
```

[Here's a snippet](./at-rule-ast-example.json) of the resulting AtRule node

*Keep in mind the csstree AST isn't pure json.  They override `toJSON` to provide that structure when printed*

For an example of traversing this property, see [postcss-remove-duplicate-mq](https://github.com/olsonpm/postcss-remove-duplicate-mq).  The apis I found most useful are csstree's [walk](https://github.com/csstree/csstree/blob/master/docs/traversal.md) and its (linked) [List](https://github.com/csstree/csstree/blob/master/docs/List.md)
