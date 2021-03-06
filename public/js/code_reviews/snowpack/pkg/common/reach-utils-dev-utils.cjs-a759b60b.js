import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import './index-94aecd8d.js';

var reachUtilsDevUtils_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Just a lil state logger
 *
 * @param state
 * @param DEBUG
 */

function useStateLogger(state, DEBUG) {
}
/**
 * When in dev mode, checks that styles for a given `@reach` package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example checkStyles("dialog") will check for styles for @reach/dialog
 */

function checkStyles(packageName) {
}
/**
 * When in dev mode, checks that styles for a given `@reach` package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example useCheckStyles("dialog") will check for styles for @reach/dialog
 */

function useCheckStyles(packageName) {
}
/**
 * Logs a warning in dev mode when a component switches from controlled to
 * uncontrolled, or vice versa
 *
 * A single prop should typically be used to determine whether or not a
 * component is controlled or not.
 *
 * @param controlledValue
 * @param controlledPropName
 * @param componentName
 */

function useControlledSwitchWarning(controlledValue, controlledPropName, componentName) {
}

exports.checkStyles = checkStyles;
exports.useCheckStyles = useCheckStyles;
exports.useControlledSwitchWarning = useControlledSwitchWarning;
exports.useStateLogger = useStateLogger;
});

var reachUtilsDevUtils_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsDevUtils_cjs_prod;
}
});

export { reachUtilsDevUtils_cjs as r };
