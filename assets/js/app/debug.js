'use strict'

module.exports = {
  hoverPolygon: false,
  canvasRectangles: false,
  forceLeftHandTraffic: false,
  forceMetric: false,
  forceUnsupportedBrowser: false,
  forceNonRetina: false,
  forceNoInternet: false,
  secretSegments: false,
  experimental: false,
  detectFromUrl: function () {
    var url = location.href

    // TODO const
    if (url.match(/[\?\&]debug-hover-polygon\&?/)) {
      this.hoverPolygon = true

      var el = document.createElement('div')
      el.id = 'debug-hover-polygon'
      document.body.appendChild(el)

      var canvasEl = document.createElement('canvas')
      canvasEl.width = window.innerWidth
      canvasEl.height = window.innerHeight
      el.appendChild(canvasEl)
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

