/**
 *  Status message
 *
 *  Popup message on-screen for relaying quick messages
 *
 *  @module StatusMessage
 */

// Placeholders for initialization, kept globally for now
var _statusMessage
var _noConnectionMessage

// The no-connection message is actually a variant of this.
// Combine? Create a message queue?
var StatusMessage = (function () {
  /* global system, msg, _loseAnyFocus */
  var STATUS_MESSAGE_HIDE_DELAY = 15000

  /**
   *  Creates a new status message.
   *
   *  @public
   *  @constructor
   *  @param {string} [text] - Message to display.
   *  @param {string} [buttonText] - Button text to display.
   *  @param {function} [buttonCallback] - Function to call when button is clicked
   *  @param {boolean} [persist=false] - If true, status message will not automatically
   *    hide itself, nor will an X button be provided to close it. It relies on the
   *    hide() method to be called in order to remove it.
   */
  var StatusMessage = function (containerEl, text, buttonText, buttonCallback, persist) {
    this.hideTimer = -1
    this.scheduleTime = -1
    this.persist = persist || false
    this.text = text || ''
    this.buttonText = buttonText || null
    this.buttonCallback = buttonCallback || null
    this.el = this.buildMessageEl(this.text, this.buttonText, this.buttonCallback, this.persist)
//    console.log(containerEl)
    containerEl.appendChild(this.el)
  }

  /**
   *  Makes the status message visible.
   *
   *  @param {number} [timeout=10000] - Number of milliseconds to wait before calling show()
   */
  StatusMessage.prototype.set = function () {

  }

  /**
   *  Makes the status message visible.
   *
   *  @param {number} [timeout=10000] - Number of milliseconds to wait before calling show()
   */
  StatusMessage.prototype.show = function (text, buttonText, buttonCallback) {
    window.clearTimeout(this.hideTimer)
    // Replace message parameters, if given
    this.text = text || this.text
    this.buttonText = buttonText || this.buttonText
    this.buttonCallback = buttonCallback || this.buttonCallback

    this.el = this.buildMessageEl(text, buttonText, buttonCallback, this.persist)
    this.el.classList.add('visible')

    if (!this.persist) {
      this.hideTimer = window.setTimeout(_statusMessage.hide, STATUS_MESSAGE_HIDE_DELAY)
    }
  }

  /**
   *  Wraps StatusMessage.prototype.show(). Takes an additional argument that waits
   *  the set amount of milliseconds before calling show()
   *
   *  @param {number} [timeout=10000] - Number of milliseconds to wait before calling show()
   */
  StatusMessage.prototype.schedule = function (timeout) {
    timeout = timeout || 10000
    if (this.scheduleTimer === -1) {
      this.scheduleTimer = window.setTimeout(this.show, timeout)
    }
  }

  StatusMessage.prototype.hide = function () {
    window.clearTimeout(this.hideTimer)
    window.clearTimeout(this.scheduleTimer)
    this.hideTimer = -1
    this.scheduleTimer = -1

    this.el.classList.remove('visible')

    // Force window to refocus on document.body after status-message is closed by X button
    // Required on Chrome
    _loseAnyFocus()
  }

  /**
   *  Builds the DOM for the message.
   *
   *  @private
   *  @param {string} text - Message to display.
   *  @param {string} [buttonText] - Button text to display.
   *  @param {function} [buttonCallback] - Function to call when button is clicked
   *  @param {boolean} [persist=false] - If true, status message will not automatically
   *    hide itself, nor will an X button be provided to close it. It relies on the
   *    hide() method to be called in order to remove it.
   */
  StatusMessage.prototype.buildMessageEl = function () {
    var el = document.createElement('div')
    el.className = 'status-message'
    el.textContent = this.text || ''

    if (this.buttonText && this.buttonCallback) {
      var buttonEl = document.createElement('button')
      buttonEl.textContent = this.buttonText
      buttonEl.addEventListener('click', this.buttonCallback)
      el.appendChild(buttonEl)
    }

    if (!this.persist) {
      var closeEl = document.createElement('button')
      closeEl.classList.add('close')
      closeEl.textContent = msg('UI_GLYPH_X')
      //if (system.touch) {
      //  closeEl.addEventListener('touchstart', this.hide)
      //} else {
        closeEl.addEventListener('click', this.hide)
      //}
      el.appendChild(closeEl)
    }

    return el
  }

  return StatusMessage
  /*
  return {
    timerId: -1,

    show: function (text, undo) {
      window.clearTimeout(_statusMessage.timerId)

      document.querySelector('#status-message > div').innerHTML = text

      if (undo) {
        var buttonEl = document.createElement('button')
        buttonEl.innerHTML = msg('BUTTON_UNDO')
        buttonEl.addEventListener('click', _undo)
        document.querySelector('#status-message > div').appendChild(buttonEl)
      }

      var el = document.createElement('button')
      el.classList.add('close')
      if (system.touch) {
        el.addEventListener('touchstart', _statusMessage.hide)
      } else {
        el.addEventListener('click', _statusMessage.hide)
      }
      el.innerHTML = msg('UI_GLYPH_X')
      document.querySelector('#status-message > div').appendChild(el)

      document.querySelector('#status-message > div').classList.add('visible')

      _statusMessage.timerId =
        window.setTimeout(_statusMessage.hide, STATUS_MESSAGE_HIDE_DELAY)
    },

    hide: function () {
      document.querySelector('#status-message > div').classList.remove('visible')

      // Force window to refocus on document.body after status-message is closed by X button
      // Required on Chrome
      _loseAnyFocus()
    }
  }*/
})()
