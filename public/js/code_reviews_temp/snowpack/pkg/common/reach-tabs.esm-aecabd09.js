import { r as react } from './index-94aecd8d.js';
import { u as useDescendantsInit, D as DescendantProvider, a as useDescendant, c as createDescendantContext, b as useDescendants, d as useDescendantKeyDown } from './reach-descendants.esm-624cc6ed.js';
import { r as reachUtilsComputedStyles_cjs } from './reach-utils-computed-styles.cjs-9e3ce8fa.js';
import { r as reachUtilsCloneValidElement_cjs } from './reach-utils-clone-valid-element.cjs-cd06bdaa.js';
import { r as reachUtilsUseControlledState_cjs } from './reach-utils-use-controlled-state.cjs-198a8bc6.js';
import { r as reachUtilsUseStatefulRefValue_cjs } from './reach-utils-use-stateful-ref-value.cjs-e01b72af.js';
import { r as reachUtilsUseIsomorphicLayoutEffect_cjs } from './reach-utils-use-isomorphic-layout-effect.cjs-3b6b2b2b.js';
import { r as reachUtilsContext_cjs } from './reach-utils-context.cjs-2c765d23.js';
import { r as reachUtilsTypeCheck_cjs } from './reach-utils-type-check.cjs-bd64ca98.js';
import { r as reachUtilsMakeId_cjs } from './reach-utils-make-id.cjs-44f1aaec.js';
import { r as reachUtilsNoop_cjs } from './reach-utils-noop.cjs-7a28234d.js';
import { r as reachUtilsDevUtils_cjs } from './reach-utils-dev-utils.cjs-a759b60b.js';
import { r as reachUtilsComposeRefs_cjs } from './reach-utils-compose-refs.cjs-dabe7f7b.js';
import { r as reachUtilsUseUpdateEffect_cjs } from './reach-utils-use-update-effect.cjs-27123b70.js';
import { r as reachUtilsComposeEventHandlers_cjs } from './reach-utils-compose-event-handlers.cjs-00987eb6.js';
import { u as useId } from './reach-auto-id.esm-f316b583.js';

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

var _excluded = ["as", "children", "defaultIndex", "orientation", "index", "keyboardActivation", "onChange", "readOnly"],
    _excluded2 = ["children", "as", "onKeyDown"],
    _excluded3 = ["isSelected", "children", "as", "index", "disabled", "onBlur", "onFocus"],
    _excluded4 = ["children", "as"],
    _excluded5 = ["children", "aria-label", "as", "index"];
var TabsDescendantsContext = /*#__PURE__*/createDescendantContext("TabsDescendantsContext");
var TabPanelDescendantsContext = /*#__PURE__*/createDescendantContext("TabPanelDescendantsContext");
var TabsContext = /*#__PURE__*/reachUtilsContext_cjs.createNamedContext("TabsContext", {});
var TabsKeyboardActivation;

(function (TabsKeyboardActivation) {
  TabsKeyboardActivation["Auto"] = "auto";
  TabsKeyboardActivation["Manual"] = "manual";
})(TabsKeyboardActivation || (TabsKeyboardActivation = {}));

var TabsOrientation; ////////////////////////////////////////////////////////////////////////////////

/**
 * Tabs
 *
 * The parent component of the tab interface.
 *
 * @see Docs https://reach.tech/tabs#tabs
 */

(function (TabsOrientation) {
  TabsOrientation["Horizontal"] = "horizontal";
  TabsOrientation["Vertical"] = "vertical";
})(TabsOrientation || (TabsOrientation = {}));

var Tabs = /*#__PURE__*/react.forwardRef(function (_ref, ref) {
  var _props$id;

  var _ref$as = _ref.as,
      Comp = _ref$as === void 0 ? "div" : _ref$as,
      children = _ref.children,
      defaultIndex = _ref.defaultIndex,
      _ref$orientation = _ref.orientation,
      orientation = _ref$orientation === void 0 ? TabsOrientation.Horizontal : _ref$orientation,
      _ref$index = _ref.index,
      controlledIndex = _ref$index === void 0 ? undefined : _ref$index,
      _ref$keyboardActivati = _ref.keyboardActivation,
      keyboardActivation = _ref$keyboardActivati === void 0 ? TabsKeyboardActivation.Auto : _ref$keyboardActivati,
      onChange = _ref.onChange,
      _ref$readOnly = _ref.readOnly,
      readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  var isControlled = react.useRef(controlledIndex != null);
  reachUtilsDevUtils_cjs.useControlledSwitchWarning(controlledIndex, "index", "Tabs");

  var _id = useId(props.id);

  var id = (_props$id = props.id) != null ? _props$id : reachUtilsMakeId_cjs.makeId("tabs", _id); // We only manage focus if the user caused the update vs. a new controlled
  // index coming in.

  var userInteractedRef = react.useRef(false);
  var selectedPanelRef = react.useRef(null);
  var isRTL = react.useRef(false);

  var _useControlledState = reachUtilsUseControlledState_cjs.useControlledState(controlledIndex, defaultIndex != null ? defaultIndex : 0),
      selectedIndex = _useControlledState[0],
      setSelectedIndex = _useControlledState[1];

  var _React$useState = react.useState(-1),
      focusedIndex = _React$useState[0],
      setFocusedIndex = _React$useState[1];

  var _useDescendantsInit = useDescendantsInit(),
      tabs = _useDescendantsInit[0],
      setTabs = _useDescendantsInit[1];

  var context = react.useMemo(function () {
    return {
      focusedIndex: focusedIndex,
      id: id,
      isControlled: isControlled.current,
      isRTL: isRTL,
      keyboardActivation: keyboardActivation,
      onFocusPanel: function onFocusPanel() {
        if (selectedPanelRef.current && reachUtilsTypeCheck_cjs.isFunction(selectedPanelRef.current.focus)) {
          selectedPanelRef.current.focus();
        }
      },
      onSelectTab: readOnly ? reachUtilsNoop_cjs.noop : function (index) {
        userInteractedRef.current = true;
        onChange && onChange(index);
        setSelectedIndex(index);
      },
      onSelectTabWithKeyboard: readOnly ? reachUtilsNoop_cjs.noop : function (index) {
        var _tabs$index;

        userInteractedRef.current = true;

        switch (keyboardActivation) {
          case TabsKeyboardActivation.Manual:
            var tabElement = (_tabs$index = tabs[index]) == null ? void 0 : _tabs$index.element;

            if (tabElement && reachUtilsTypeCheck_cjs.isFunction(tabElement.focus)) {
              tabElement.focus();
            }

            return;

          case TabsKeyboardActivation.Auto:
          default:
            onChange && onChange(index);
            setSelectedIndex(index);
            return;
        }
      },
      orientation: orientation,
      selectedIndex: selectedIndex,
      selectedPanelRef: selectedPanelRef,
      setFocusedIndex: setFocusedIndex,
      setSelectedIndex: setSelectedIndex,
      userInteractedRef: userInteractedRef
    };
  }, [focusedIndex, id, keyboardActivation, onChange, orientation, readOnly, selectedIndex, setSelectedIndex, tabs]);
  reachUtilsDevUtils_cjs.useCheckStyles("tabs");
  return /*#__PURE__*/react.createElement(DescendantProvider, {
    context: TabsDescendantsContext,
    items: tabs,
    set: setTabs
  }, /*#__PURE__*/react.createElement(TabsContext.Provider, {
    value: context
  }, /*#__PURE__*/react.createElement(Comp, _extends({}, props, {
    ref: ref,
    "data-reach-tabs": "",
    "data-orientation": orientation,
    id: props.id
  }), reachUtilsTypeCheck_cjs.isFunction(children) ? children({
    focusedIndex: focusedIndex,
    id: id,
    selectedIndex: selectedIndex
  }) : children)));
});

/**
 * TabList
 *
 * The parent component of the tabs.
 *
 * @see Docs https://reach.tech/tabs#tablist
 */


var TabListImpl = /*#__PURE__*/react.forwardRef(function (_ref2, forwardedRef) {
  var children = _ref2.children,
      _ref2$as = _ref2.as,
      Comp = _ref2$as === void 0 ? "div" : _ref2$as,
      onKeyDown = _ref2.onKeyDown,
      props = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  var _React$useContext = react.useContext(TabsContext),
      focusedIndex = _React$useContext.focusedIndex,
      isControlled = _React$useContext.isControlled,
      isRTL = _React$useContext.isRTL,
      keyboardActivation = _React$useContext.keyboardActivation,
      onSelectTabWithKeyboard = _React$useContext.onSelectTabWithKeyboard,
      orientation = _React$useContext.orientation,
      selectedIndex = _React$useContext.selectedIndex,
      setSelectedIndex = _React$useContext.setSelectedIndex;

  var tabs = useDescendants(TabsDescendantsContext);
  var ownRef = react.useRef(null);
  var ref = reachUtilsComposeRefs_cjs.useComposedRefs(forwardedRef, ownRef);
  react.useEffect(function () {
    if (ownRef.current && (ownRef.current.ownerDocument && ownRef.current.ownerDocument.dir === "rtl" || reachUtilsComputedStyles_cjs.getComputedStyle(ownRef.current, "direction") === "rtl")) {
      isRTL.current = true;
    }
  }, [isRTL]);
  var handleKeyDown = reachUtilsComposeEventHandlers_cjs.composeEventHandlers(onKeyDown, useDescendantKeyDown(TabsDescendantsContext, {
    currentIndex: keyboardActivation === TabsKeyboardActivation.Manual ? focusedIndex : selectedIndex,
    orientation: orientation,
    rotate: true,
    callback: onSelectTabWithKeyboard,
    filter: function filter(tab) {
      return !tab.disabled;
    },
    rtl: isRTL.current
  }));
  reachUtilsUseIsomorphicLayoutEffect_cjs.useIsomorphicLayoutEffect(function () {
    var _tabs$selectedIndex;

    // In the event an uncontrolled component's selected index is disabled,
    // (this should only happen if the first tab is disabled and no default
    // index is set), we need to override the selection to the next selectable
    // index value.
    if (!isControlled && boolOrBoolString((_tabs$selectedIndex = tabs[selectedIndex]) == null ? void 0 : _tabs$selectedIndex.disabled)) {
      var next = tabs.find(function (tab) {
        return !tab.disabled;
      });

      if (next) {
        setSelectedIndex(next.index);
      }
    }
  }, [tabs, isControlled, selectedIndex, setSelectedIndex]);
  return /*#__PURE__*/react.createElement(Comp // The element that serves as the container for the set of tabs has role
  // `tablist`
  // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
  , _extends({
    role: "tablist" // If the `tablist` element is vertically oriented, it has the property
    // `aria-orientation` set to `"vertical"`. The default value of
    // `aria-orientation` for a tablist element is `"horizontal"`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    ,
    "aria-orientation": orientation
  }, props, {
    "data-reach-tab-list": "",
    ref: ref,
    onKeyDown: handleKeyDown
  }), react.Children.map(children, function (child, index) {
    // TODO: Remove in 1.0
    return reachUtilsCloneValidElement_cjs.cloneValidElement(child, {
      isSelected: index === selectedIndex
    });
  }));
});

var TabList = /*#__PURE__*/react.memo(TabListImpl);

/**
 * Tab
 *
 * The interactive element that changes the selected panel.
 *
 * @see Docs https://reach.tech/tabs#tab
 */


var Tab = /*#__PURE__*/react.forwardRef(function (_ref3, forwardedRef) {
  _ref3.isSelected;
      var children = _ref3.children,
      _ref3$as = _ref3.as,
      Comp = _ref3$as === void 0 ? "button" : _ref3$as,
      indexProp = _ref3.index,
      disabled = _ref3.disabled,
      onBlur = _ref3.onBlur,
      onFocus = _ref3.onFocus,
      props = _objectWithoutPropertiesLoose(_ref3, _excluded3);

  var _React$useContext2 = react.useContext(TabsContext),
      tabsId = _React$useContext2.id,
      onSelectTab = _React$useContext2.onSelectTab,
      orientation = _React$useContext2.orientation,
      selectedIndex = _React$useContext2.selectedIndex,
      userInteractedRef = _React$useContext2.userInteractedRef,
      setFocusedIndex = _React$useContext2.setFocusedIndex;

  var ownRef = react.useRef(null);

  var _useStatefulRefValue = reachUtilsUseStatefulRefValue_cjs.useStatefulRefValue(ownRef, null),
      element = _useStatefulRefValue[0],
      handleRefSet = _useStatefulRefValue[1];

  var ref = reachUtilsComposeRefs_cjs.useComposedRefs(forwardedRef, handleRefSet);
  var descendant = react.useMemo(function () {
    return {
      element: element,
      disabled: !!disabled
    };
  }, [disabled, element]);
  var index = useDescendant(descendant, TabsDescendantsContext, indexProp);
  var htmlType = Comp === "button" && props.type == null ? "button" : props.type;
  var isSelected = index === selectedIndex;

  function onSelect() {
    onSelectTab(index);
  }

  reachUtilsUseUpdateEffect_cjs.useUpdateEffect(function () {
    if (isSelected && ownRef.current && userInteractedRef.current) {
      userInteractedRef.current = false;

      if (reachUtilsTypeCheck_cjs.isFunction(ownRef.current.focus)) {
        ownRef.current.focus();
      }
    }
  }, [isSelected, userInteractedRef]);
  return /*#__PURE__*/react.createElement(Comp // Each element with role `tab` has the property `aria-controls` referring
  // to its associated `tabpanel` element.
  // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
  , _extends({
    "aria-controls": reachUtilsMakeId_cjs.makeId(tabsId, "panel", index),
    "aria-disabled": disabled // The active tab element has the state `aria-selected` set to `true` and
    // all other tab elements have it set to `false`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    ,
    "aria-selected": isSelected // Each element that serves as a tab has role `tab` and is contained
    // within the element with role `tablist`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    ,
    role: "tab",
    tabIndex: isSelected ? 0 : -1
  }, props, {
    ref: ref,
    "data-reach-tab": "",
    "data-orientation": orientation,
    "data-selected": isSelected ? "" : undefined,
    disabled: disabled,
    id: reachUtilsMakeId_cjs.makeId(tabsId, "tab", index),
    onClick: onSelect,
    onFocus: reachUtilsComposeEventHandlers_cjs.composeEventHandlers(onFocus, function () {
      setFocusedIndex(index);
    }),
    onBlur: reachUtilsComposeEventHandlers_cjs.composeEventHandlers(onBlur, function () {
      setFocusedIndex(-1);
    }),
    type: htmlType
  }), children);
});

/**
 * TabPanels
 *
 * The parent component of the panels.
 *
 * @see Docs https://reach.tech/tabs#tabpanels
 */


var TabPanelsImpl = /*#__PURE__*/react.forwardRef(function (_ref4, forwardedRef) {
  var children = _ref4.children,
      _ref4$as = _ref4.as,
      Comp = _ref4$as === void 0 ? "div" : _ref4$as,
      props = _objectWithoutPropertiesLoose(_ref4, _excluded4);

  var ownRef = react.useRef();
  var ref = reachUtilsComposeRefs_cjs.useComposedRefs(ownRef, forwardedRef);

  var _useDescendantsInit2 = useDescendantsInit(),
      tabPanels = _useDescendantsInit2[0],
      setTabPanels = _useDescendantsInit2[1];

  return /*#__PURE__*/react.createElement(DescendantProvider, {
    context: TabPanelDescendantsContext,
    items: tabPanels,
    set: setTabPanels
  }, /*#__PURE__*/react.createElement(Comp, _extends({}, props, {
    ref: ref,
    "data-reach-tab-panels": ""
  }), children));
});

var TabPanels = /*#__PURE__*/react.memo(TabPanelsImpl);

/**
 * TabPanel
 *
 * The panel that displays when it's corresponding tab is active.
 *
 * @see Docs https://reach.tech/tabs#tabpanel
 */


var TabPanel = /*#__PURE__*/react.forwardRef(function (_ref5, forwardedRef) {
  var children = _ref5.children;
      _ref5["aria-label"];
      var _ref5$as = _ref5.as,
      Comp = _ref5$as === void 0 ? "div" : _ref5$as,
      indexProp = _ref5.index,
      props = _objectWithoutPropertiesLoose(_ref5, _excluded5);

  var _React$useContext3 = react.useContext(TabsContext),
      selectedPanelRef = _React$useContext3.selectedPanelRef,
      selectedIndex = _React$useContext3.selectedIndex,
      tabsId = _React$useContext3.id;

  var ownRef = react.useRef(null);

  var _useStatefulRefValue2 = reachUtilsUseStatefulRefValue_cjs.useStatefulRefValue(ownRef, null),
      element = _useStatefulRefValue2[0],
      handleRefSet = _useStatefulRefValue2[1];

  var descendant = react.useMemo(function () {
    return {
      element: element
    };
  }, [element]);
  var index = useDescendant(descendant, TabPanelDescendantsContext, indexProp);
  var id = reachUtilsMakeId_cjs.makeId(tabsId, "panel", index); // Because useDescendant will always return -1 on the first render,
  // `isSelected` will briefly be false for all tabs. We set a tab panel's
  // hidden attribute based `isSelected` being false, meaning that all tabs
  // are initially hidden. This makes it impossible for consumers to do
  // certain things, like focus an element inside the active tab panel when
  // the page loads. So what we can do is track that a panel is "ready" to be
  // hidden once effects are run (descendants work their magic in
  // useLayoutEffect, so we can set our ref in useEffecct to run later). We
  // can use a ref instead of state because we're always geting a re-render
  // anyway thanks to descendants. This is a little more coupled to the
  // implementation details of descendants than I'd like, but we'll add a test
  // to (hopefully) catch any regressions.

  var isSelected = index === selectedIndex;
  var readyToHide = react.useRef(false);
  var hidden = readyToHide.current ? !isSelected : false;
  react.useEffect(function () {
    readyToHide.current = true;
  }, []);
  var ref = reachUtilsComposeRefs_cjs.useComposedRefs(forwardedRef, handleRefSet, isSelected ? selectedPanelRef : null);
  return /*#__PURE__*/react.createElement(Comp // Each element with role `tabpanel` has the property `aria-labelledby`
  // referring to its associated tab element.
  , _extends({
    "aria-labelledby": reachUtilsMakeId_cjs.makeId(tabsId, "tab", index),
    hidden: hidden // Each element that contains the content panel for a tab has role
    // `tabpanel`.
    // https://www.w3.org/TR/wai-aria-practices-1.2/#tabpanel
    ,
    role: "tabpanel",
    tabIndex: isSelected ? 0 : -1
  }, props, {
    ref: ref,
    "data-reach-tab-panel": "",
    id: id
  }), children);
});

function boolOrBoolString(value) {
  return value === "true" ? true : reachUtilsTypeCheck_cjs.isBoolean(value) ? value : false;
}

export { Tabs as T, TabList as a, Tab as b, TabPanels as c, TabPanel as d };
