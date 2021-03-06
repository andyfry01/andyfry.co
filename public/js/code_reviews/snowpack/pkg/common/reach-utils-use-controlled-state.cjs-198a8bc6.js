import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import { r as react } from './index-94aecd8d.js';

var reachUtilsUseControlledState_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



/**
 * Check if a component is controlled or uncontrolled and return the correct
 * state value and setter accordingly. If the component state is controlled by
 * the app, the setter is a noop.
 *
 * @param controlledValue
 * @param defaultValue
 */
function useControlledState(controlledValue, defaultValue) {
  var controlledRef = react.useRef(controlledValue != null);

  var _useState = react.useState(defaultValue),
      valueState = _useState[0],
      setValue = _useState[1];

  var set = react.useCallback(function (n) {
    if (!controlledRef.current) {
      setValue(n);
    }
  }, []);
  return [controlledRef.current ? controlledValue : valueState, set];
}

exports.useControlledState = useControlledState;
});

var reachUtilsUseControlledState_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsUseControlledState_cjs_prod;
}
});

export { reachUtilsUseControlledState_cjs as r };
