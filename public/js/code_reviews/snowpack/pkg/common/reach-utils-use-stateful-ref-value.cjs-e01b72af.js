import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import { r as react } from './index-94aecd8d.js';

var reachUtilsUseStatefulRefValue_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



function useStatefulRefValue(ref, initialState) {
  var _useState = react.useState(initialState),
      state = _useState[0],
      setState = _useState[1];

  var callbackRef = react.useCallback(function (refValue) {
    ref.current = refValue;
    setState(refValue); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [state, callbackRef];
}

exports.useStatefulRefValue = useStatefulRefValue;
});

var reachUtilsUseStatefulRefValue_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsUseStatefulRefValue_cjs_prod;
}
});

export { reachUtilsUseStatefulRefValue_cjs as r };
