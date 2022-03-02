import React from "./snowpack/pkg/react.js";
import ReactDOM from "./snowpack/pkg/react-dom.js";
import "./snowpack/pkg/@reach/tabs/styles.css.proxy.js";
import PongOriginal from "./examples/pong/original.js";
import PongImproved from "./examples/pong/improved.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(PongOriginal, null), document.getElementById("pong-original"));
ReactDOM.render(/* @__PURE__ */ React.createElement(PongImproved, null), document.getElementById("pong-improved"));
