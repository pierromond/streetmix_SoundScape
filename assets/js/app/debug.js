/**
 *  Debug feature flags
 *
 *  @module debug
 */
'use strict'

module.exports = {
  // Default values
  hoverPolygon: false,
  canvasRectangles: false,
  forceLeftHandTraffic: false,
  forceMetric: false,
  forceUnsupportedBrowser: false,
  forceNonRetina: false,
  forceNoInternet: false,
  secretSegments: false,
  experimental: false,

  // Call this to set the values based on URL flags.
  detectFromUrl: function () {
    var url = window.location.href

    // TODO const
    if (url.match(/[\?\&]debug-hover-polygon\&?/)) {
      this.hoverPolygon = true
    }

    // TODO better
    if (url.match(/[\?\&]debug-canvas-rectangles\&?/)) {
      this.canvasRectangles = true
    }

    if (url.match(/[\?\&]debug-force-left-hand-traffic\&?/)) {
      this.forceLeftHandTraffic = true
    }

    if (url.match(/[\?\&]debug-force-metric\&?/)) {
      this.forceMetric = true
    }

    if (url.match(/[\?\&]debug-force-unsupported-browser\&?/)) {
      this.forceUnsupportedBrowser = true
    }

    if (url.match(/[\?\&]debug-force-non-retina\&?/)) {
      this.forceNonRetina = true
    }

    if (url.match(/[\?\&]debug-secret-segments\&?/)) {
      this.secretSegments = true
    }

    if (url.match(/[\?\&]debug-hover-polygon\&?/)) {
      this.hoverPolygon = true
    }

    if (url.match(/[\?\&]debug-force-read-only\&?/)) {
      this.forceReadOnly = true
    }

    if (url.match(/[\?\&]debug-force-touch\&?/)) {
      this.forceTouch = true
    }

    if (url.match(/[\?\&]debug-force-live-update\&?/)) {
      this.forceLiveUpdate = true
    }

    if (url.match(/[\?\&]debug-force-no-internet\&?/)) {
      this.forceNoInternet = true
    }

    if (url.match(/[\?\&]debug-experimental\&?/)) {
      this.experimental = true
    }

    return this
  }
}
