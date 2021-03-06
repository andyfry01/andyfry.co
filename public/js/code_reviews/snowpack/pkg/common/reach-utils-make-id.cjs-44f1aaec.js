import { c as createCommonjsModule } from './commonjsHelpers-8c19dec8.js';

var reachUtilsMakeId_cjs_prod = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Joins strings to format IDs for compound components.
 *
 * @param args
 */
function makeId() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.filter(function (val) {
    return val != null;
  }).join("--");
}

exports.makeId = makeId;
});

var reachUtilsMakeId_cjs = createCommonjsModule(function (module) {

{
  module.exports = reachUtilsMakeId_cjs_prod;
}
});

export { reachUtilsMakeId_cjs as r };
