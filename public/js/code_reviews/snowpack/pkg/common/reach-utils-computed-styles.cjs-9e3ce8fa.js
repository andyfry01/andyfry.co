import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import { r as reachUtilsCanUseDom_cjs_prod } from './reach-utils-can-use-dom.cjs.prod-36602d55.js';

var reachUtilsOwnerDocument_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



/**
 * Get an element's owner document. Useful when components are used in iframes
 * or other environments like dev tools.
 *
 * @param element
 */

function getOwnerDocument(element) {
  return reachUtilsCanUseDom_cjs_prod.canUseDOM() ? element ? element.ownerDocument : document : null;
}
/**
 * TODO: Remove in 1.0
 */

function getOwnerWindow(element) {
  var ownerDocument = getOwnerDocument(element);
  return ownerDocument ? ownerDocument.defaultView || window : null;
}

exports.getOwnerDocument = getOwnerDocument;
exports.getOwnerWindow = getOwnerWindow;
});

var reachUtilsComputedStyles_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });




/**
 * Get computed style properties of a DOM element.
 *
 * @param element
 * @param styleProp
 */

function getComputedStyles(element) {
  var ownerWindow = reachUtilsOwnerDocument_cjs_prod.getOwnerWindow(element);

  if (ownerWindow) {
    return ownerWindow.getComputedStyle(element, null);
  }

  return null;
}
/**
 * Get a computed style value by property.
 *
 * @param element
 * @param styleProp
 */

function getComputedStyle(element, styleProp) {
  var _getComputedStyles;

  return ((_getComputedStyles = getComputedStyles(element)) == null ? void 0 : _getComputedStyles.getPropertyValue(styleProp)) || null;
}

exports.getComputedStyle = getComputedStyle;
exports.getComputedStyles = getComputedStyles;
});

var reachUtilsComputedStyles_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsComputedStyles_cjs_prod;
}
});

export { reachUtilsComputedStyles_cjs as r };
