import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import { r as react } from './index-94aecd8d.js';

var reachUtilsUseUpdateEffect_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });



/**
 * Call an effect after a component update, skipping the initial mount.
 *
 * @param effect Effect to call
 * @param deps Effect dependency list
 */
function useUpdateEffect(effect, deps) {
  var mounted = react.useRef(false);
  react.useEffect(function () {
    if (mounted.current) {
      effect();
    } else {
      mounted.current = true;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, deps);
}

exports.useUpdateEffect = useUpdateEffect;
});

var reachUtilsUseUpdateEffect_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsUseUpdateEffect_cjs_prod;
}
});

export { reachUtilsUseUpdateEffect_cjs as r };
