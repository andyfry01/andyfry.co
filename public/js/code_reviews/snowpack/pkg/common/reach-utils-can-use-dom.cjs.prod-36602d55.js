import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';

var reachUtilsCanUseDom_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}

exports.canUseDOM = canUseDOM;
});

export { reachUtilsCanUseDom_cjs_prod as r };
