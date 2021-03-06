import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';

var reachUtilsTypeCheck_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Checks whether or not a value is a boolean.
 *
 * @param value
 */
function isBoolean(value) {
  return typeof value === "boolean";
}
/**
 * Checks whether or not a value is a function.
 *
 * @param value
 */

function isFunction(value) {
  // eslint-disable-next-line eqeqeq
  return !!(value && {}.toString.call(value) == "[object Function]");
}
/**
 * Checks whether or not a value is a number.
 *
 * @param value
 */

function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}
/**
 * Checks whether or not a value is a string.
 *
 * @param value
 */

function isString(value) {
  return typeof value === "string";
}

exports.isBoolean = isBoolean;
exports.isFunction = isFunction;
exports.isNumber = isNumber;
exports.isString = isString;
});

export { reachUtilsTypeCheck_cjs_prod as r };
