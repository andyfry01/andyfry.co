import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import { r as react } from './index-94aecd8d.js';

var reachUtilsUseForceUpdate_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */

function useForceUpdate() {
  var _useState = react.useState(Object.create(null)),
      dispatch = _useState[1];

  return react.useCallback(function () {
    dispatch(Object.create(null));
  }, []);
}

exports.useForceUpdate = useForceUpdate;
});

var reachUtilsUseForceUpdate_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsUseForceUpdate_cjs_prod;
}
});

export { reachUtilsUseForceUpdate_cjs as r };
