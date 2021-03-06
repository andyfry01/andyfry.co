import { r as react } from './index-94aecd8d.js';
import { r as reachUtilsUseForceUpdate_cjs } from './reach-utils-use-force-update.cjs-f6e7f9f3.js';
import { r as reachUtilsUseIsomorphicLayoutEffect_cjs } from './reach-utils-use-isomorphic-layout-effect.cjs-3b6b2b2b.js';
import { r as reachUtilsContext_cjs } from './reach-utils-context.cjs-2c765d23.js';
import { r as reachUtilsNoop_cjs } from './reach-utils-noop.cjs-7a28234d.js';

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var _excluded = ["element", "index"];

function createDescendantContext(name, initialValue) {
  if (initialValue === void 0) {
    initialValue = {};
  }

  var descendants = [];
  return reachUtilsContext_cjs.createNamedContext(name, _extends({
    descendants: descendants,
    registerDescendant: reachUtilsNoop_cjs.noop,
    unregisterDescendant: reachUtilsNoop_cjs.noop
  }, initialValue));
}
/**
 * This hook registers our descendant by passing it into an array. We can then
 * search that array by to find its index when registering it in the component.
 * We use this for focus management, keyboard navigation, and typeahead
 * functionality for some components.
 *
 * The hook accepts the element node and (optionally) a key. The key is useful
 * if multiple descendants have identical text values and we need to
 * differentiate siblings for some reason.
 *
 * Our main goals with this are:
 *   1) maximum composability,
 *   2) minimal API friction
 *   3) SSR compatibility*
 *   4) concurrent safe
 *   5) index always up-to-date with the tree despite changes
 *   6) works with memoization of any component in the tree (hopefully)
 *
 * As for SSR, the good news is that we don't actually need the index on the
 * server for most use-cases, as we are only using it to determine the order of
 * composed descendants for keyboard navigation. However, in the few cases where
 * this is not the case, we can require an explicit index from the app.
 */


function useDescendant(descendant, context, indexProp) {
  var forceUpdate = reachUtilsUseForceUpdate_cjs.useForceUpdate();

  var _React$useContext = react.useContext(context),
      registerDescendant = _React$useContext.registerDescendant,
      unregisterDescendant = _React$useContext.unregisterDescendant,
      descendants = _React$useContext.descendants; // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants so that
  // everything is up-to-date before the user interacts with a collection.


  var index = indexProp != null ? indexProp : descendants.findIndex(function (item) {
    return item.element === descendant.element;
  }); // Prevent any flashing

  reachUtilsUseIsomorphicLayoutEffect_cjs.useIsomorphicLayoutEffect(function () {
    if (!descendant.element) forceUpdate();
    registerDescendant(_extends({}, descendant, {
      index: index
    }));
    return function () {
      unregisterDescendant(descendant.element);
    };
  }, [descendant, forceUpdate, index, registerDescendant, unregisterDescendant].concat(Object.values(descendant)));
  return index;
}

function useDescendantsInit() {
  return react.useState([]);
}

function useDescendants(ctx) {
  return react.useContext(ctx).descendants;
}

function DescendantProvider(_ref) {
  var Ctx = _ref.context,
      children = _ref.children,
      items = _ref.items,
      set = _ref.set;
  var registerDescendant = react.useCallback(function (_ref2) {
    var element = _ref2.element,
        explicitIndex = _ref2.index,
        rest = _objectWithoutPropertiesLoose(_ref2, _excluded);

    if (!element) {
      return;
    }

    set(function (items) {
      var newItems;

      if (explicitIndex != null) {
        return [].concat(items, [_extends({}, rest, {
          element: element,
          index: explicitIndex
        })]).sort(function (a, b) {
          return a.index - b.index;
        });
      } else if (items.length === 0) {
        // If there are no items, register at index 0 and bail.
        newItems = [_extends({}, rest, {
          element: element,
          index: 0
        })];
      } else if (items.find(function (item) {
        return item.element === element;
      })) {
        // If the element is already registered, just use the same array
        newItems = items;
      } else {
        // When registering a descendant, we need to make sure we insert in
        // into the array in the same order that it appears in the DOM. So as
        // new descendants are added or maybe some are removed, we always know
        // that the array is up-to-date and correct.
        //
        // So here we look at our registered descendants and see if the new
        // element we are adding appears earlier than an existing descendant's
        // DOM node via `node.compareDocumentPosition`. If it does, we insert
        // the new element at this index. Because `registerDescendant` will be
        // called in an effect every time the descendants state value changes,
        // we should be sure that this index is accurate when descendent
        // elements come or go from our component.
        var index = items.findIndex(function (item) {
          if (!item.element || !element) {
            return false;
          } // Does this element's DOM node appear before another item in the
          // array in our DOM tree? If so, return true to grab the index at
          // this point in the array so we know where to insert the new
          // element.


          return Boolean(item.element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING);
        });

        var newItem = _extends({}, rest, {
          element: element,
          index: index
        }); // If an index is not found we will push the element to the end.


        if (index === -1) {
          newItems = [].concat(items, [newItem]);
        } else {
          newItems = [].concat(items.slice(0, index), [newItem], items.slice(index));
        }
      }

      return newItems.map(function (item, index) {
        return _extends({}, item, {
          index: index
        });
      });
    });
  }, // set is a state setter initialized by the useDescendantsInit hook.
  // We can safely ignore the lint warning here because it will not change
  // between renders.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  var unregisterDescendant = react.useCallback(function (element) {
    if (!element) {
      return;
    }

    set(function (items) {
      return items.filter(function (item) {
        return element !== item.element;
      });
    });
  }, // set is a state setter initialized by the useDescendantsInit hook.
  // We can safely ignore the lint warning here because it will not change
  // between renders.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  []);
  return /*#__PURE__*/react.createElement(Ctx.Provider, {
    value: react.useMemo(function () {
      return {
        descendants: items,
        registerDescendant: registerDescendant,
        unregisterDescendant: unregisterDescendant
      };
    }, [items, registerDescendant, unregisterDescendant])
  }, children);
}
/**
 * Testing this as an abstraction for compound components that use keyboard
 * navigation. Hoping this will help us prevent bugs and mismatched behavior
 * across various components, but it may also prove to be too messy of an
 * abstraction in the end.
 *
 * Currently used in:
 *   - Tabs
 *   - Accordion
 *
 * @param context
 * @param options
 */


function useDescendantKeyDown(context, options) {
  var _React$useContext2 = react.useContext(context),
      descendants = _React$useContext2.descendants;

  var callback = options.callback,
      currentIndex = options.currentIndex,
      filter = options.filter,
      _options$key = options.key,
      key = _options$key === void 0 ? "index" : _options$key,
      _options$orientation = options.orientation,
      orientation = _options$orientation === void 0 ? "vertical" : _options$orientation,
      _options$rotate = options.rotate,
      rotate = _options$rotate === void 0 ? true : _options$rotate,
      _options$rtl = options.rtl,
      rtl = _options$rtl === void 0 ? false : _options$rtl;
  return function handleKeyDown(event) {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End"].includes(event.key)) {
      return;
    }

    var index = currentIndex != null ? currentIndex : -1; // If we use a filter function, we need to re-index our descendants array
    // so that filtered descendent elements aren't selected.

    var selectableDescendants = filter ? descendants.filter(filter) : descendants; // We need some options for any of this to work!

    if (!selectableDescendants.length) {
      return;
    }

    var selectableIndex = selectableDescendants.findIndex(function (descendant) {
      return descendant.index === currentIndex;
    });

    function getNextOption() {
      var atBottom = index === getLastOption().index;
      return atBottom ? rotate ? getFirstOption() : selectableDescendants[selectableIndex] : selectableDescendants[(selectableIndex + 1) % selectableDescendants.length];
    }

    function getPreviousOption() {
      var atTop = index === getFirstOption().index;
      return atTop ? rotate ? getLastOption() : selectableDescendants[selectableIndex] : selectableDescendants[(selectableIndex - 1 + selectableDescendants.length) % selectableDescendants.length];
    }

    function getFirstOption() {
      return selectableDescendants[0];
    }

    function getLastOption() {
      return selectableDescendants[selectableDescendants.length - 1];
    }

    switch (event.key) {
      case "ArrowDown":
        if (orientation === "vertical" || orientation === "both") {
          event.preventDefault();
          var next = getNextOption();
          callback(key === "option" ? next : next[key]);
        }

        break;

      case "ArrowUp":
        if (orientation === "vertical" || orientation === "both") {
          event.preventDefault();
          var prev = getPreviousOption();
          callback(key === "option" ? prev : prev[key]);
        }

        break;

      case "ArrowLeft":
        if (orientation === "horizontal" || orientation === "both") {
          event.preventDefault();
          var nextOrPrev = (rtl ? getNextOption : getPreviousOption)();
          callback(key === "option" ? nextOrPrev : nextOrPrev[key]);
        }

        break;

      case "ArrowRight":
        if (orientation === "horizontal" || orientation === "both") {
          event.preventDefault();
          var prevOrNext = (rtl ? getPreviousOption : getNextOption)();
          callback(key === "option" ? prevOrNext : prevOrNext[key]);
        }

        break;

      case "PageUp":
        event.preventDefault();
        var prevOrFirst = (event.ctrlKey ? getPreviousOption : getFirstOption)();
        callback(key === "option" ? prevOrFirst : prevOrFirst[key]);
        break;

      case "Home":
        event.preventDefault();
        var first = getFirstOption();
        callback(key === "option" ? first : first[key]);
        break;

      case "PageDown":
        event.preventDefault();
        var nextOrLast = (event.ctrlKey ? getNextOption : getLastOption)();
        callback(key === "option" ? nextOrLast : nextOrLast[key]);
        break;

      case "End":
        event.preventDefault();
        var last = getLastOption();
        callback(key === "option" ? last : last[key]);
        break;
    }
  };
} ////////////////////////////////////////////////////////////////////////////////

export { DescendantProvider as D, useDescendant as a, useDescendants as b, createDescendantContext as c, useDescendantKeyDown as d, useDescendantsInit as u };
