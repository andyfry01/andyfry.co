// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ":root {\n  --reach-tabs: 1;\n}\n\n[data-reach-tabs][data-orientation=\"vertical\"] {\n  display: flex;\n}\n\n[data-reach-tab-list] {\n  display: flex;\n  background: hsla(0, 0%, 0%, 0.05);\n}\n\n[data-reach-tab-list][aria-orientation=\"vertical\"] {\n  flex-direction: column;\n}\n\n[data-reach-tab] {\n  display: inline-block;\n  border: none;\n  padding: 0.25em 0.5em;\n  margin: 0;\n  border-bottom: 1px solid transparent;\n  background: none;\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n\n[data-reach-tab]:active {\n  background: hsla(0, 0%, 0%, 0.05);\n}\n\n[data-reach-tab]:disabled {\n  opacity: 0.25;\n  cursor: default;\n}\n\n[data-reach-tab][data-selected] {\n  border-bottom-color: currentColor;\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}