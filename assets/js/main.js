/**
 *  Streetmix
 *
 *  Pre-initialization tasks are carried out here.
 *
 *  @exports Stmx
 */

var debug = require('stmx/app/debug')
var system = require('stmx/app/system-capabilities')

var Stmx = function () {
  this.initializing = true
  this.ignoreStreetChanges = true
  this.debug = debug.detectFromUrl()
  this.system = system.detectCapabilities()
  this.readOnly = (system.phone || debug.forceReadOnly)
}

Stmx.prototype.init = function () {
  // Basically, a lazy import
  // You want the require() to run only when .init()
  // is actually called, which is sometime after
  // the Stmx object is created and exported.
  var init = require('stmx/app/initialization.js')
  init()
}

// var MenuManager = require('./menus/menu-manager.js')
// var Menu = require('./menus/menu.js')

window.Stmx = module.exports = new Stmx()
