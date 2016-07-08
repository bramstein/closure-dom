goog.provide('dom');

goog.scope(function () {
  /**
   * @private
   * @return {boolean}
   */
  dom.supportsAddEventListener = function () {
    return !!document.addEventListener;
  };

  /**
   * @param {string} name
   * @return {Element}
   */
  dom.createElement = function (name) {
    return document.createElement(name);
  };

  /**
   * @param {string} text
   * @return {Text}
   */
  dom.createText = function (text) {
    return document.createTextNode(text);
  };

  /**
   * @param {Element} element
   * @param {string} style
   */
  dom.style = function (element, style) {
    element.style.cssText = style;
  };

  /**
   * @param {Node} parent
   * @param {Node} child
   */
  dom.append = function (parent, child) {
    parent.appendChild(child);
  };

  /**
   * @param {Node} parent
   * @param {Node} child
   */
  dom.remove = function (parent, child) {
    parent.removeChild(child);
  };

  /**
   * @param {Element} element
   * @param {string} className
   *
   * @return {boolean}
   */
  dom.hasClass = function (element, className) {
    return element.className.split(/\s+/).indexOf(className) !== -1;
  };

  /**
   * @param {Element} element
   * @param {string} className
   */
  dom.addClass = function (element, className) {
    if (!dom.hasClass(element, className)) {
      element.className += ' ' + className;
    }
  };

  /**
   * @param {Element} element
   * @param {string} className
   */
  dom.removeClass = function (element, className) {
    if (dom.hasClass(element, className)) {
      var parts = element.className.split(/\s+/);
      var index = parts.indexOf(className);

      parts.splice(index, 1);

      element.className = parts.join(' ');
    }
  };

  /**
   * @param {Element} element
   * @param {string} oldClassName
   * @param {string} newClassName
   */
  dom.replaceClass = function (element, oldClassName, newClassName) {
    if (dom.hasClass(element, oldClassName)) {
      var parts = element.className.split(/\s+/);
      var index = parts.indexOf(oldClassName);

      parts[index] = newClassName;

      element.className = parts.join(' ');
    }
  };

  /**
   * @param {Element} element
   * @param {string} event
   * @param {function(Event)} callback
   */
  dom.addListener = function (element, event, callback) {
    if (dom.supportsAddEventListener()) {
      element.addEventListener(event, callback, false);
    } else {
      element.attachEvent(event, callback);
    }
  };

  /**
   * @param {function()} callback
   */
  dom.waitForBody = function (callback) {
    if (document.body) {
      callback();
    } else {
      if (dom.supportsAddEventListener()) {
        document.addEventListener('DOMContentLoaded', function listener() {
          document.removeEventListener('DOMContentLoaded', listener);
          callback();
        });
      } else {
        // IE8
        document.attachEvent('onreadystatechange', function listener() {
          if (document.readyState == 'interactive' || document.readyState == 'complete') {
            document.detachEvent('onreadystatechange', listener);
            callback();
          }
        });
      }
    }
  };
});
