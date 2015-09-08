'use strict'

var path = require('path')
var browserify = require('browserify-middleware')

var JS_SOURCE = '/assets/js/main.js'

module.exports = browserify(path.join(process.cwd(), JS_SOURCE), {
  cache: true,
  precompile: true
})
