import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import { r as react } from './index-94aecd8d.js';

var reachUtilsCloneValidElement_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



/**
 * Type-safe clone element
 *
 * @param element
 * @param props
 * @param children
 */
function cloneValidElement(element, props) {
  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return /*#__PURE__*/react.isValidElement(element) ? react.cloneElement.apply(void 0, [element, props].concat(children)) : element;
}

exports.cloneValidElement = cloneValidElement;
});

var reachUtilsCloneValidElement_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsCloneValidElement_cjs_prod;
}
});

export { reachUtilsCloneValidElement_cjs as r };
