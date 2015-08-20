'use strict'

var path = require('path')
var browserify = require('browserify-middleware')

var JS = '/assets/js/app.js'

module.exports = browserify(path.join(process.cwd(), '/assets/js/app.js'), {
  cache: true,
  precompile: true
})
