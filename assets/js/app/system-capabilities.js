/**
 *  System capabilities
 *
 *  Determines system capabilities.
 *  Part of the pre-initialization process.
 *
 *  @module system-capabilities
 *  @requires Modernizr
 */
'use strict'

var Modernizr = require('modernizr')
var debug = require('stmx/app/debug')

module.exports = {
  // Default values
  touch: false,
  phone: false,
  safari: false,
  windows: false,
  noInternet: false,
  viewportWidth: null,
  viewportHeight: null,
  hiDpi: 1.0,
  cssTransform: false,
  ipAddress: null,
  apiUrl: null,

  // Call this to detect & set system capability values.
  detectCapabilities: function () {
    // NOTE:
    // This function might be called on very old browsers. Please make
    // sure not to use modern faculties.
    /* global NO_INTERNET_MODE */

    if (debug.forceNoInternet || NO_INTERNET_MODE === true) {
      this.noInternet = true
    }

    if (debug.forceTouch) {
      this.touch = true
    } else {
      this.touch = Modernizr.touch
    }

    // Get system prefixes for page visibility API, page hidden and visibility state
    this.pageVisibility = Modernizr.pagevisibility
    this.hiddenProperty = Modernizr.prefixed('hidden', document, false)
    this.visibilityState = Modernizr.prefixed('visibilityState', document, false)
    if (this.hiddenProperty) {
      switch (this.hiddenProperty.toLowerCase()) {
        case 'hidden':
          this.visibilityChange = 'visibilitychange'
          break
        case 'mozhidden':
          this.visibilityChange = 'mozvisibilitychange'
          break
        case 'mshidden':
          this.visibilityChange = 'msvisibilitychange'
          break
        case 'webkithidden':
          this.visibilityChange = 'webkitvisibilitychange'
          break
        default:
          this.visibilityChange = false
          break
      }
    }

    if (debug.forceNonRetina) {
      this.hiDpi = 1.0
    } else {
      this.hiDpi = window.devicePixelRatio || 1.0
    }

    if ((typeof window.matchMedia !== 'undefined') &&
      window.matchMedia('only screen and (max-device-width: 480px)').matches) {
      this.phone = true
    } else {
      this.phone = false
    }

    // Returns CSS prefixed property or false if not supported.
    this.cssTransform = Modernizr.prefixed('transform')

    if (navigator.userAgent.indexOf('Windows') !== -1) {
      this.windows = true
    }

    if ((navigator.userAgent.indexOf('Safari') !== -1) &&
      (navigator.userAgent.indexOf('Chrome') === -1)) {
      this.safari = true
    }

    var meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    if (this.phone) {
      meta.setAttribute('content', 'initial-scale=.5, maximum-scale=.5')
    } else {
      meta.setAttribute('content', 'initial-scale=1, maximum-scale=1')
    }
    var headEls = document.getElementsByTagName('head')
    headEls[0].appendChild(meta)

    return this
  }
}
