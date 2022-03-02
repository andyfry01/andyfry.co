import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';

var reachUtilsComposeEventHandlers_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */
function composeEventHandlers(theirHandler, ourHandler) {
  return function (event) {
    theirHandler && theirHandler(event);

    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}

exports.composeEventHandlers = composeEventHandlers;
});

var reachUtilsComposeEventHandlers_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsComposeEventHandlers_cjs_prod;
}
});

export { reachUtilsComposeEventHandlers_cjs as r };
