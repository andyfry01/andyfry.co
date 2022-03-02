import React from "./snowpack/pkg/react.js";
import ReactDOM from "./snowpack/pkg/react-dom.js";
import "./snowpack/pkg/@reach/tabs/styles.css.proxy.js";
import TicTacToeOriginal from "./examples/tic-tac-toe/original.js";
import TicTacToeImproved from "./examples/tic-tac-toe/improved.js";
ReactDOM.render(/* @__PURE__ */ React.createElement(TicTacToeOriginal, null), document.getElementById("tic-tac-toe-original"));
ReactDOM.render(/* @__PURE__ */ React.createElement(TicTacToeImproved, null), document.getElementById("tic-tac-toe-improved"));
