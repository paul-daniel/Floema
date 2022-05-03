"use strict";
self["webpackHotUpdateFloema"]("main",{

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js ***!
  \*******************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/* eslint-env browser */

/*
  eslint-disable
  no-console,
  func-names
*/

/** @typedef {any} TODO */

var normalizeUrl = __webpack_require__(/*! ./normalize-url */ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js");

var srcByModuleId = Object.create(null);
var noDocument = typeof document === "undefined";
var forEach = Array.prototype.forEach;
/**
 * @param {function} fn
 * @param {number} time
 * @returns {(function(): void)|*}
 */

function debounce(fn, time) {
  var timeout = 0;
  return function () {
    // @ts-ignore
    var self = this; // eslint-disable-next-line prefer-rest-params

    var args = arguments;

    var functionCall = function functionCall() {
      return fn.apply(self, args);
    };

    clearTimeout(timeout); // @ts-ignore

    timeout = setTimeout(functionCall, time);
  };
}

function noop() {}
/**
 * @param {TODO} moduleId
 * @returns {TODO}
 */


function getCurrentScriptUrl(moduleId) {
  var src = srcByModuleId[moduleId];

  if (!src) {
    if (document.currentScript) {
      src =
      /** @type {HTMLScriptElement} */
      document.currentScript.src;
    } else {
      var scripts = document.getElementsByTagName("script");
      var lastScriptTag = scripts[scripts.length - 1];

      if (lastScriptTag) {
        src = lastScriptTag.src;
      }
    }

    srcByModuleId[moduleId] = src;
  }
  /**
   * @param {string} fileMap
   * @returns {null | string[]}
   */


  return function (fileMap) {
    if (!src) {
      return null;
    }

    var splitResult = src.split(/([^\\/]+)\.js$/);
    var filename = splitResult && splitResult[1];

    if (!filename) {
      return [src.replace(".js", ".css")];
    }

    if (!fileMap) {
      return [src.replace(".js", ".css")];
    }

    return fileMap.split(",").map(function (mapRule) {
      var reg = new RegExp("".concat(filename, "\\.js$"), "g");
      return normalizeUrl(src.replace(reg, "".concat(mapRule.replace(/{fileName}/g, filename), ".css")));
    });
  };
}
/**
 * @param {TODO} el
 * @param {string} [url]
 */


function updateCss(el, url) {
  if (!url) {
    if (!el.href) {
      return;
    } // eslint-disable-next-line


    url = el.href.split("?")[0];
  }

  if (!isUrlRequest(
  /** @type {string} */
  url)) {
    return;
  }

  if (el.isLoaded === false) {
    // We seem to be about to replace a css link that hasn't loaded yet.
    // We're probably changing the same file more than once.
    return;
  }

  if (!url || !(url.indexOf(".css") > -1)) {
    return;
  } // eslint-disable-next-line no-param-reassign


  el.visited = true;
  var newEl = el.cloneNode();
  newEl.isLoaded = false;
  newEl.addEventListener("load", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.addEventListener("error", function () {
    if (newEl.isLoaded) {
      return;
    }

    newEl.isLoaded = true;
    el.parentNode.removeChild(el);
  });
  newEl.href = "".concat(url, "?").concat(Date.now());

  if (el.nextSibling) {
    el.parentNode.insertBefore(newEl, el.nextSibling);
  } else {
    el.parentNode.appendChild(newEl);
  }
}
/**
 * @param {string} href
 * @param {TODO} src
 * @returns {TODO}
 */


function getReloadUrl(href, src) {
  var ret; // eslint-disable-next-line no-param-reassign

  href = normalizeUrl(href);
  src.some(
  /**
   * @param {string} url
   */
  // eslint-disable-next-line array-callback-return
  function (url) {
    if (href.indexOf(src) > -1) {
      ret = url;
    }
  });
  return ret;
}
/**
 * @param {string} [src]
 * @returns {boolean}
 */


function reloadStyle(src) {
  if (!src) {
    return false;
  }

  var elements = document.querySelectorAll("link");
  var loaded = false;
  forEach.call(elements, function (el) {
    if (!el.href) {
      return;
    }

    var url = getReloadUrl(el.href, src);

    if (!isUrlRequest(url)) {
      return;
    }

    if (el.visited === true) {
      return;
    }

    if (url) {
      updateCss(el, url);
      loaded = true;
    }
  });
  return loaded;
}

function reloadAll() {
  var elements = document.querySelectorAll("link");
  forEach.call(elements, function (el) {
    if (el.visited === true) {
      return;
    }

    updateCss(el);
  });
}
/**
 * @param {string} url
 * @returns {boolean}
 */


function isUrlRequest(url) {
  // An URL is not an request if
  // It is not http or https
  if (!/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) {
    return false;
  }

  return true;
}
/**
 * @param {TODO} moduleId
 * @param {TODO} options
 * @returns {TODO}
 */


module.exports = function (moduleId, options) {
  if (noDocument) {
    console.log("no window.document found, will not HMR CSS");
    return noop;
  }

  var getScriptSrc = getCurrentScriptUrl(moduleId);

  function update() {
    var src = getScriptSrc(options.filename);
    var reloaded = reloadStyle(src);

    if (options.locals) {
      console.log("[HMR] Detected local css modules. Reload all css");
      reloadAll();
      return;
    }

    if (reloaded) {
      console.log("[HMR] css reload %s", src.join(" "));
    } else {
      console.log("[HMR] Reload all css");
      reloadAll();
    }
  }

  return debounce(update, 50);
};

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js":
/*!************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/hmr/normalize-url.js ***!
  \************************************************************************/
/***/ ((module) => {


/* eslint-disable */

/**
 * @param {string[]} pathComponents
 * @returns {string}
 */

function normalizeUrl(pathComponents) {
  return pathComponents.reduce(function (accumulator, item) {
    switch (item) {
      case "..":
        accumulator.pop();
        break;

      case ".":
        break;

      default:
        accumulator.push(item);
    }

    return accumulator;
  },
  /** @type {string[]} */
  []).join("/");
}
/**
 * @param {string} urlString
 * @returns {string}
 */


module.exports = function (urlString) {
  urlString = urlString.trim();

  if (/^data:/i.test(urlString)) {
    return urlString;
  }

  var protocol = urlString.indexOf("//") !== -1 ? urlString.split("//")[0] + "//" : "";
  var components = urlString.replace(new RegExp(protocol, "i"), "").split("/");
  var host = components[0].toLowerCase().replace(/\.$/, "");
  components[0] = "";
  var path = normalizeUrl(components);
  return protocol + host + path;
};

/***/ }),

/***/ "./styles/index.scss":
/*!***************************!*\
  !*** ./styles/index.scss ***!
  \***************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1651580090187
      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {"publicPath":"","locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9e4b88f95d9a900d9993")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5mM2Q4MTVlN2FlMDAxMmNhOTEyOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFhO0FBRWI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFDQSxJQUFJQSxZQUFZLEdBQUdDLG1CQUFPLENBQUMseUZBQUQsQ0FBMUI7O0FBRUEsSUFBSUMsYUFBYSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxJQUFkLENBQXBCO0FBQ0EsSUFBSUMsVUFBVSxHQUFHLE9BQU9DLFFBQVAsS0FBb0IsV0FBckM7QUFDQSxJQUFJQyxPQUFPLEdBQUdDLEtBQUssQ0FBQ0MsU0FBTixDQUFnQkYsT0FBOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVNHLFFBQVQsQ0FBa0JDLEVBQWxCLEVBQXNCQyxJQUF0QixFQUE0QjtBQUMxQixNQUFJQyxPQUFPLEdBQUcsQ0FBZDtBQUNBLFNBQU8sWUFBWTtBQUNqQjtBQUNBLFFBQUlDLElBQUksR0FBRyxJQUFYLENBRmlCLENBRUE7O0FBRWpCLFFBQUlDLElBQUksR0FBR0MsU0FBWDs7QUFFQSxRQUFJQyxZQUFZLEdBQUcsU0FBU0EsWUFBVCxHQUF3QjtBQUN6QyxhQUFPTixFQUFFLENBQUNPLEtBQUgsQ0FBU0osSUFBVCxFQUFlQyxJQUFmLENBQVA7QUFDRCxLQUZEOztBQUlBSSxJQUFBQSxZQUFZLENBQUNOLE9BQUQsQ0FBWixDQVZpQixDQVVNOztBQUV2QkEsSUFBQUEsT0FBTyxHQUFHTyxVQUFVLENBQUNILFlBQUQsRUFBZUwsSUFBZixDQUFwQjtBQUNELEdBYkQ7QUFjRDs7QUFFRCxTQUFTUyxJQUFULEdBQWdCLENBQUU7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQVNDLG1CQUFULENBQTZCQyxRQUE3QixFQUF1QztBQUNyQyxNQUFJQyxHQUFHLEdBQUd0QixhQUFhLENBQUNxQixRQUFELENBQXZCOztBQUVBLE1BQUksQ0FBQ0MsR0FBTCxFQUFVO0FBQ1IsUUFB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QTNDLENBQVg7QUFDQXFELEVBQUFBLFVBQVUsQ0FBQyxDQUFELENBQVYsR0FBZ0IsRUFBaEI7QUFDQSxNQUFJRyxJQUFJLEdBQUcxRixZQUFZLENBQUN1RixVQUFELENBQXZCO0FBQ0EsU0FBT0QsUUFBUSxHQUFHRSxJQUFYLEdBQWtCRSxJQUF6QjtBQUNELENBYkQ7Ozs7Ozs7Ozs7O0FDakNBO0FBQ1U7QUFDVixPQUFPLElBQVU7QUFDakI7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQyx5SkFBMEUsY0FBYywrQkFBK0I7QUFDckosTUFBTSxVQUFVO0FBQ2hCLE1BQU0saUJBQWlCO0FBQ3ZCO0FBQ0E7Ozs7Ozs7O1VDUkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GbG9lbWEvLi9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9obXIvaG90TW9kdWxlUmVwbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vRmxvZW1hLy4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL25vcm1hbGl6ZS11cmwuanMiLCJ3ZWJwYWNrOi8vRmxvZW1hLy4vc3R5bGVzL2luZGV4LnNjc3M/ZjBmZiIsIndlYnBhY2s6Ly9GbG9lbWEvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuLypcbiAgZXNsaW50LWRpc2FibGVcbiAgbm8tY29uc29sZSxcbiAgZnVuYy1uYW1lc1xuKi9cblxuLyoqIEB0eXBlZGVmIHthbnl9IFRPRE8gKi9cbnZhciBub3JtYWxpemVVcmwgPSByZXF1aXJlKFwiLi9ub3JtYWxpemUtdXJsXCIpO1xuXG52YXIgc3JjQnlNb2R1bGVJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG52YXIgbm9Eb2N1bWVudCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIjtcbnZhciBmb3JFYWNoID0gQXJyYXkucHJvdG90eXBlLmZvckVhY2g7XG4vKipcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZVxuICogQHJldHVybnMgeyhmdW5jdGlvbigpOiB2b2lkKXwqfVxuICovXG5cbmZ1bmN0aW9uIGRlYm91bmNlKGZuLCB0aW1lKSB7XG4gIHZhciB0aW1lb3V0ID0gMDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgdmFyIHNlbGYgPSB0aGlzOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG5cbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHZhciBmdW5jdGlvbkNhbGwgPSBmdW5jdGlvbiBmdW5jdGlvbkNhbGwoKSB7XG4gICAgICByZXR1cm4gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfTtcblxuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTsgLy8gQHRzLWlnbm9yZVxuXG4gICAgdGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb25DYWxsLCB0aW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4vKipcbiAqIEBwYXJhbSB7VE9ET30gbW9kdWxlSWRcbiAqIEByZXR1cm5zIHtUT0RPfVxuICovXG5cblxuZnVuY3Rpb24gZ2V0Q3VycmVudFNjcmlwdFVybChtb2R1bGVJZCkge1xuICB2YXIgc3JjID0gc3JjQnlNb2R1bGVJZFttb2R1bGVJZF07XG5cbiAgaWYgKCFzcmMpIHtcbiAgICBpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdCkge1xuICAgICAgc3JjID1cbiAgICAgIC8qKiBAdHlwZSB7SFRNTFNjcmlwdEVsZW1lbnR9ICovXG4gICAgICBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcbiAgICAgIHZhciBsYXN0U2NyaXB0VGFnID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAobGFzdFNjcmlwdFRhZykge1xuICAgICAgICBzcmMgPSBsYXN0U2NyaXB0VGFnLnNyYztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzcmNCeU1vZHVsZUlkW21vZHVsZUlkXSA9IHNyYztcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVNYXBcbiAgICogQHJldHVybnMge251bGwgfCBzdHJpbmdbXX1cbiAgICovXG5cblxuICByZXR1cm4gZnVuY3Rpb24gKGZpbGVNYXApIHtcbiAgICBpZiAoIXNyYykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHNwbGl0UmVzdWx0ID0gc3JjLnNwbGl0KC8oW15cXFxcL10rKVxcLmpzJC8pO1xuICAgIHZhciBmaWxlbmFtZSA9IHNwbGl0UmVzdWx0ICYmIHNwbGl0UmVzdWx0WzFdO1xuXG4gICAgaWYgKCFmaWxlbmFtZSkge1xuICAgICAgcmV0dXJuIFtzcmMucmVwbGFjZShcIi5qc1wiLCBcIi5jc3NcIildO1xuICAgIH1cblxuICAgIGlmICghZmlsZU1hcCkge1xuICAgICAgcmV0dXJuIFtzcmMucmVwbGFjZShcIi5qc1wiLCBcIi5jc3NcIildO1xuICAgIH1cblxuICAgIHJldHVybiBmaWxlTWFwLnNwbGl0KFwiLFwiKS5tYXAoZnVuY3Rpb24gKG1hcFJ1bGUpIHtcbiAgICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiXCIuY29uY2F0KGZpbGVuYW1lLCBcIlxcXFwuanMkXCIpLCBcImdcIik7XG4gICAgICByZXR1cm4gbm9ybWFsaXplVXJsKHNyYy5yZXBsYWNlKHJlZywgXCJcIi5jb25jYXQobWFwUnVsZS5yZXBsYWNlKC97ZmlsZU5hbWV9L2csIGZpbGVuYW1lKSwgXCIuY3NzXCIpKSk7XG4gICAgfSk7XG4gIH07XG59XG4vKipcbiAqIEBwYXJhbSB7VE9ET30gZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBbdXJsXVxuICovXG5cblxuZnVuY3Rpb24gdXBkYXRlQ3NzKGVsLCB1cmwpIHtcbiAgaWYgKCF1cmwpIHtcbiAgICBpZiAoIWVsLmhyZWYpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuXG5cbiAgICB1cmwgPSBlbC5ocmVmLnNwbGl0KFwiP1wiKVswXTtcbiAgfVxuXG4gIGlmICghaXNVcmxSZXF1ZXN0KFxuICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgdXJsKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChlbC5pc0xvYWRlZCA9PT0gZmFsc2UpIHtcbiAgICAvLyBXZSBzZWVtIHRvIGJlIGFib3V0IHRvIHJlcGxhY2UgYSBjc3MgbGluayB0aGF0IGhhc24ndCBsb2FkZWQgeWV0LlxuICAgIC8vIFdlJ3JlIHByb2JhYmx5IGNoYW5naW5nIHRoZSBzYW1lIGZpbGUgbW9yZSB0aGFuIG9uY2UuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCF1cmwgfHwgISh1cmwuaW5kZXhPZihcIi5jc3NcIikgPiAtMSkpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cblxuICBlbC52aXNpdGVkID0gdHJ1ZTtcbiAgdmFyIG5ld0VsID0gZWwuY2xvbmVOb2RlKCk7XG4gIG5ld0VsLmlzTG9hZGVkID0gZmFsc2U7XG4gIG5ld0VsLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobmV3RWwuaXNMb2FkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuZXdFbC5pc0xvYWRlZCA9IHRydWU7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH0pO1xuICBuZXdFbC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgZnVuY3Rpb24gKCkge1xuICAgIGlmIChuZXdFbC5pc0xvYWRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5ld0VsLmlzTG9hZGVkID0gdHJ1ZTtcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgfSk7XG4gIG5ld0VsLmhyZWYgPSBcIlwiLmNvbmNhdCh1cmwsIFwiP1wiKS5jb25jYXQoRGF0ZS5ub3coKSk7XG5cbiAgaWYgKGVsLm5leHRTaWJsaW5nKSB7XG4gICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3RWwsIGVsLm5leHRTaWJsaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKG5ld0VsKTtcbiAgfVxufVxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gaHJlZlxuICogQHBhcmFtIHtUT0RPfSBzcmNcbiAqIEByZXR1cm5zIHtUT0RPfVxuICovXG5cblxuZnVuY3Rpb24gZ2V0UmVsb2FkVXJsKGhyZWYsIHNyYykge1xuICB2YXIgcmV0OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuICBocmVmID0gbm9ybWFsaXplVXJsKGhyZWYpO1xuICBzcmMuc29tZShcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICovXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgZnVuY3Rpb24gKHVybCkge1xuICAgIGlmIChocmVmLmluZGV4T2Yoc3JjKSA+IC0xKSB7XG4gICAgICByZXQgPSB1cmw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJldDtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IFtzcmNdXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuXG5cbmZ1bmN0aW9uIHJlbG9hZFN0eWxlKHNyYykge1xuICBpZiAoIXNyYykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rXCIpO1xuICB2YXIgbG9hZGVkID0gZmFsc2U7XG4gIGZvckVhY2guY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsKSB7XG4gICAgaWYgKCFlbC5ocmVmKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHVybCA9IGdldFJlbG9hZFVybChlbC5ocmVmLCBzcmMpO1xuXG4gICAgaWYgKCFpc1VybFJlcXVlc3QodXJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHVybCkge1xuICAgICAgdXBkYXRlQ3NzKGVsLCB1cmwpO1xuICAgICAgbG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gbG9hZGVkO1xufVxuXG5mdW5jdGlvbiByZWxvYWRBbGwoKSB7XG4gIHZhciBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJsaW5rXCIpO1xuICBmb3JFYWNoLmNhbGwoZWxlbWVudHMsIGZ1bmN0aW9uIChlbCkge1xuICAgIGlmIChlbC52aXNpdGVkID09PSB0cnVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdXBkYXRlQ3NzKGVsKTtcbiAgfSk7XG59XG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5cblxuZnVuY3Rpb24gaXNVcmxSZXF1ZXN0KHVybCkge1xuICAvLyBBbiBVUkwgaXMgbm90IGFuIHJlcXVlc3QgaWZcbiAgLy8gSXQgaXMgbm90IGh0dHAgb3IgaHR0cHNcbiAgaWYgKCEvXlthLXpBLVpdW2EtekEtWlxcZCtcXC0uXSo6Ly50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogQHBhcmFtIHtUT0RPfSBtb2R1bGVJZFxuICogQHBhcmFtIHtUT0RPfSBvcHRpb25zXG4gKiBAcmV0dXJucyB7VE9ET31cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBvcHRpb25zKSB7XG4gIGlmIChub0RvY3VtZW50KSB7XG4gICAgY29uc29sZS5sb2coXCJubyB3aW5kb3cuZG9jdW1lbnQgZm91bmQsIHdpbGwgbm90IEhNUiBDU1NcIik7XG4gICAgcmV0dXJuIG5vb3A7XG4gIH1cblxuICB2YXIgZ2V0U2NyaXB0U3JjID0gZ2V0Q3VycmVudFNjcmlwdFVybChtb2R1bGVJZCk7XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBzcmMgPSBnZXRTY3JpcHRTcmMob3B0aW9ucy5maWxlbmFtZSk7XG4gICAgdmFyIHJlbG9hZGVkID0gcmVsb2FkU3R5bGUoc3JjKTtcblxuICAgIGlmIChvcHRpb25zLmxvY2Fscykge1xuICAgICAgY29uc29sZS5sb2coXCJbSE1SXSBEZXRlY3RlZCBsb2NhbCBjc3MgbW9kdWxlcy4gUmVsb2FkIGFsbCBjc3NcIik7XG4gICAgICByZWxvYWRBbGwoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVsb2FkZWQpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiW0hNUl0gY3NzIHJlbG9hZCAlc1wiLCBzcmMuam9pbihcIiBcIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhcIltITVJdIFJlbG9hZCBhbGwgY3NzXCIpO1xuICAgICAgcmVsb2FkQWxsKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRlYm91bmNlKHVwZGF0ZSwgNTApO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogZXNsaW50LWRpc2FibGUgKi9cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXRoQ29tcG9uZW50c1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplVXJsKHBhdGhDb21wb25lbnRzKSB7XG4gIHJldHVybiBwYXRoQ29tcG9uZW50cy5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBpdGVtKSB7XG4gICAgc3dpdGNoIChpdGVtKSB7XG4gICAgICBjYXNlIFwiLi5cIjpcbiAgICAgICAgYWNjdW11bGF0b3IucG9wKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiLlwiOlxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWNjdW11bGF0b3IucHVzaChpdGVtKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH0sXG4gIC8qKiBAdHlwZSB7c3RyaW5nW119ICovXG4gIFtdKS5qb2luKFwiL1wiKTtcbn1cbi8qKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybFN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybFN0cmluZykge1xuICB1cmxTdHJpbmcgPSB1cmxTdHJpbmcudHJpbSgpO1xuXG4gIGlmICgvXmRhdGE6L2kudGVzdCh1cmxTdHJpbmcpKSB7XG4gICAgcmV0dXJuIHVybFN0cmluZztcbiAgfVxuXG4gIHZhciBwcm90b2NvbCA9IHVybFN0cmluZy5pbmRleE9mKFwiLy9cIikgIT09IC0xID8gdXJsU3RyaW5nLnNwbGl0KFwiLy9cIilbMF0gKyBcIi8vXCIgOiBcIlwiO1xuICB2YXIgY29tcG9uZW50cyA9IHVybFN0cmluZy5yZXBsYWNlKG5ldyBSZWdFeHAocHJvdG9jb2wsIFwiaVwiKSwgXCJcIikuc3BsaXQoXCIvXCIpO1xuICB2YXIgaG9zdCA9IGNvbXBvbmVudHNbMF0udG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXC4kLywgXCJcIik7XG4gIGNvbXBvbmVudHNbMF0gPSBcIlwiO1xuICB2YXIgcGF0aCA9IG5vcm1hbGl6ZVVybChjb21wb25lbnRzKTtcbiAgcmV0dXJuIHByb3RvY29sICsgaG9zdCArIHBhdGg7XG59OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9O1xuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE2NTE1ODAwOTAxODdcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiLi4vbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvaG1yL2hvdE1vZHVsZVJlcGxhY2VtZW50LmpzXCIpKG1vZHVsZS5pZCwge1wicHVibGljUGF0aFwiOlwiXCIsXCJsb2NhbHNcIjpmYWxzZX0pO1xuICAgICAgbW9kdWxlLmhvdC5kaXNwb3NlKGNzc1JlbG9hZCk7XG4gICAgICBtb2R1bGUuaG90LmFjY2VwdCh1bmRlZmluZWQsIGNzc1JlbG9hZCk7XG4gICAgfVxuICAiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI5ZTRiODhmOTVkOWE5MDBkOTk5M1wiKSJdLCJuYW1lcyI6WyJub3JtYWxpemVVcmwiLCJyZXF1aXJlIiwic3JjQnlNb2R1bGVJZCIsIk9iamVjdCIsImNyZWF0ZSIsIm5vRG9jdW1lbnQiLCJkb2N1bWVudCIsImZvckVhY2giLCJBcnJheSIsInByb3RvdHlwZSIsImRlYm91bmNlIiwiZm4iLCJ0aW1lIiwidGltZW91dCIsInNlbGYiLCJhcmdzIiwiYXJndW1lbnRzIiwiZnVuY3Rpb25DYWxsIiwiYXBwbHkiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0Iiwibm9vcCIsImdldEN1cnJlbnRTY3JpcHRVcmwiLCJtb2R1bGVJZCIsInNyYyIsImN1cnJlbnRTY3JpcHQiLCJzY3JpcHRzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJsYXN0U2NyaXB0VGFnIiwibGVuZ3RoIiwiZmlsZU1hcCIsInNwbGl0UmVzdWx0Iiwic3BsaXQiLCJmaWxlbmFtZSIsInJlcGxhY2UiLCJtYXAiLCJtYXBSdWxlIiwicmVnIiwiUmVnRXhwIiwiY29uY2F0IiwidXBkYXRlQ3NzIiwiZWwiLCJ1cmwiLCJocmVmIiwiaXNVcmxSZXF1ZXN0IiwiaXNMb2FkZWQiLCJpbmRleE9mIiwidmlzaXRlZCIsIm5ld0VsIiwiY2xvbmVOb2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsIkRhdGUiLCJub3ciLCJuZXh0U2libGluZyIsImluc2VydEJlZm9yZSIsImFwcGVuZENoaWxkIiwiZ2V0UmVsb2FkVXJsIiwicmV0Iiwic29tZSIsInJlbG9hZFN0eWxlIiwiZWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibG9hZGVkIiwiY2FsbCIsInJlbG9hZEFsbCIsInRlc3QiLCJtb2R1bGUiLCJleHBvcnRzIiwib3B0aW9ucyIsImNvbnNvbGUiLCJsb2ciLCJnZXRTY3JpcHRTcmMiLCJ1cGRhdGUiLCJyZWxvYWRlZCIsImxvY2FscyIsImpvaW4iLCJwYXRoQ29tcG9uZW50cyIsInJlZHVjZSIsImFjY3VtdWxhdG9yIiwiaXRlbSIsInBvcCIsInB1c2giLCJ1cmxTdHJpbmciLCJ0cmltIiwicHJvdG9jb2wiLCJjb21wb25lbnRzIiwiaG9zdCIsInRvTG93ZXJDYXNlIiwicGF0aCJdLCJzb3VyY2VSb290IjoiIn0=