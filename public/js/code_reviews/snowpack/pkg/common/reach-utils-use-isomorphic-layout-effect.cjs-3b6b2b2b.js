import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';
import { r as react } from './index-94aecd8d.js';
import { r as reachUtilsCanUseDom_cjs_prod } from './reach-utils-can-use-dom.cjs.prod-36602d55.js';

var reachUtilsUseIsomorphicLayoutEffect_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });




/**
 * React currently throws a warning when using useLayoutEffect on the server. To
 * get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also
 * need affected components to render on the server. One example is when setting
 * a component's descendants to retrieve their index values.
 *
 * Important to note that using this hook as an escape hatch will break the
 * eslint dependency warnings unless you rename the import to `useLayoutEffect`.
 * Use sparingly only when the effect won't effect the rendered HTML to avoid
 * any server/client mismatch.
 *
 * If a useLayoutEffect is needed and the result would create a mismatch, it's
 * likely that the component in question shouldn't be rendered on the server at
 * all, so a better approach would be to lazily render those in a parent
 * component after client-side hydration.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 *
 * @param effect
 * @param deps
 */

var useIsomorphicLayoutEffect = /*#__PURE__*/reachUtilsCanUseDom_cjs_prod.canUseDOM() ? react.useLayoutEffect : react.useEffect;

exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
});

var reachUtilsUseIsomorphicLayoutEffect_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsUseIsomorphicLayoutEffect_cjs_prod;
}
});

export { reachUtilsUseIsomorphicLayoutEffect_cjs as r };
