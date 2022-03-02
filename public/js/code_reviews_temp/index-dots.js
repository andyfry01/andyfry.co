import React from "./snowpack/pkg/react.js";
import ReactDOM from "./snowpack/pkg/react-dom.js";
import "./snowpack/pkg/@reach/tabs/styles.css.proxy.js";
import DotsOriginal from "./examples/dots/original.js";
import DotsImproved from "./examples/dots/improved.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(DotsOriginal, null), document.getElementById("dots-original"));
ReactDOM.render(/* @__PURE__ */ React.createElement(DotsImproved, null), document.getElementById("dots-improved"));
