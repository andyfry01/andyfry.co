import { r as react } from '../common/index-94aecd8d.js';
import { u as useId } from '../common/reach-auto-id.esm-f316b583.js';
import { m, h } from '../common/goober.modern-0a2e2c05.js';
import { _ as __pika_web_default_export_for_treeshaking__ } from '../common/index-84ac5c8c.js';
import { H as Highlight, d as defaultProps } from '../common/index-825f5d4c.js';
import { i as index_cjs } from '../common/index.cjs-895d9124.js';
import { T as Tabs, a as TabList, b as Tab, c as TabPanels, d as TabPanel } from '../common/reach-tabs.esm-aecabd09.js';
import { I as Inspector } from '../common/react-inspector-d18949bd.js';
import { l as lodash_merge } from '../common/index-a2948d75.js';
import '../common/commonjsHelpers-8c19dec8.js';
import '../object-assign.js';
import '../common/reach-utils-use-isomorphic-layout-effect.cjs-3b6b2b2b.js';
import '../common/reach-utils-can-use-dom.cjs.prod-36602d55.js';
import '../common/reach-descendants.esm-624cc6ed.js';
import '../common/reach-utils-use-force-update.cjs-f6e7f9f3.js';
import '../common/reach-utils-context.cjs-2c765d23.js';
import '../common/reach-utils-noop.cjs-7a28234d.js';
import '../common/reach-utils-computed-styles.cjs-9e3ce8fa.js';
import '../common/reach-utils-clone-valid-element.cjs-cd06bdaa.js';
import '../common/reach-utils-use-controlled-state.cjs-198a8bc6.js';
import '../common/reach-utils-use-stateful-ref-value.cjs-e01b72af.js';
import '../common/reach-utils-type-check.cjs-bd64ca98.js';
import '../common/reach-utils-type-check.cjs.prod-72819a63.js';
import '../common/reach-utils-make-id.cjs-44f1aaec.js';
import '../common/reach-utils-dev-utils.cjs-a759b60b.js';
import '../common/reach-utils-compose-refs.cjs-dabe7f7b.js';
import '../common/reach-utils-use-update-effect.cjs-27123b70.js';
import '../common/reach-utils-compose-event-handlers.cjs-00987eb6.js';
import '../common/index-8ab56611.js';
import '../common/index-74f527fb.js';
import '../common/index-4c963986.js';
import '../common/index-c18b9186.js';

function L(){return L=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);}return e},L.apply(this,arguments)}function T(e,n){return n||(n=e.slice(0)),e.raw=n,e}var H,R,W,N,I,P,U,j,O,D,J,M,z,F=m("div")(H||(H=T(["\n  background-color: ",";\n  color: ",";\n  overflow-y: auto !important;\n  font-family: ",";\n  font-feature-settings: normal;\n  height: 100%;\n"])),function(e){return e.theme.editor.backgroundColor},function(e){return e.theme.editor.color},function(e){return e.theme.editor.fontFamily}),S=function(t){var r=t.language,o=t.onChange;/*#__PURE__*/return react.createElement(F,null,/*#__PURE__*/react.createElement(__pika_web_default_export_for_treeshaking__,{value:t.code,onValueChange:function(e){return o(e,r)},style:{height:"100%"},highlight:function(t){/*#__PURE__*/return react.createElement(Highlight,L({},defaultProps,{theme:index_cjs,code:t,language:r}),function(t){var r=t.getLineProps,o=t.getTokenProps;/*#__PURE__*/return react.createElement(react.Fragment,null,t.tokens.map(function(n,t){/*#__PURE__*/return react.createElement("div",L({},r({line:n,key:t})),n.map(function(n,t){/*#__PURE__*/return react.createElement("span",L({},o({token:n,key:t})))}))}))})},padding:10}))},A=function(e){return "@media (max-width: "+e+"px)"},$=Object.freeze({custom:A,desktop:A(922),tablet:A(768),phone:A(576)}),V=m(Tabs)(R||(R=T(["\n  display: flex;\n  flex-direction: column;\n  width: 50%;\n  min-width: ",";\n\n  "," {\n    width: 100%;\n  }\n"])),function(e){return e.theme.container.minWidth},$.phone),X=m(TabList)(W||(W=T(["\n  border-bottom: ",";\n  padding: 0 0.8em;\n  background-color: ",";\n"])),function(e){return e.theme.tabs.tabHeader.borderBottom},function(e){return e.theme.tabs.tabHeader.panelBackground||"transparent"}),_=m(Tab)(N||(N=T(["\n  background-color: ",";\n  border: none;\n  padding: 0.8em 0.5em;\n  margin: 0 0.2em;\n  cursor: pointer;\n  color: ",";\n\n  &[data-selected] {\n    border-bottom: ",";\n  }\n"])),function(e){return e.theme.tabs.tabHeader.background},function(e){return e.theme.tabs.tabHeader.color},function(e){return e.theme.tabs.selectedTab.borderBottom}),q=m(TabPanels)(I||(I=T(["\n  flex: 1;\n\n  "," {\n    height: ",";\n  }\n"])),$.phone,function(e){return e.theme.tabs.tabPanel.phoneHeight}),Y=m(TabPanel)(P||(P=T(["\n  height: 100%;\n"]))),G=m(V)(U||(U=T(["\n  min-width: ",";\n"])),function(e){return e.theme.container.minWidth}),K=function(n){var r=n.code,o=n.defaultTab,a=n.onChange,i=n.width,c=react.useMemo(function(){var e=[];return r.markup&&e.push({name:"HTML",value:"markup",code:r.markup}),r.css&&e.push({name:"CSS",value:"css",code:r.css}),r.javascript&&e.push({name:"JS",value:"javascript",code:r.javascript}),e},[]);/*#__PURE__*/return react.createElement(G,{defaultIndex:c.findIndex(function(e){return e.code&&e.value===o}),style:{width:i}},/*#__PURE__*/react.createElement(X,null,c.map(function(n){return n.code&&/*#__PURE__*/react.createElement(_,{key:n.value},n.name)})),/*#__PURE__*/react.createElement(q,null,c.map(function(n){return n.code&&/*#__PURE__*/react.createElement(Y,{key:n.value},/*#__PURE__*/react.createElement(S,{code:r[n.value],onChange:a,language:n.value}))})))},Q=m("div")(j||(j=T(["\n  background-color: ",";\n  height: 100%;\n\n  li {\n    font-size: 16px !important;\n  }\n"])),function(e){return e.theme.console.background}),Z=function(n){/*#__PURE__*/return react.createElement(Q,null,n.logs.map(function(n,t){/*#__PURE__*/return react.createElement(Inspector,{data:n,key:t,theme:"chromeDark"})}))},ee=m("div")(O||(O=T(["\n  background-color: ",";\n  color: ",";\n  padding: 0.2em 0.5em;\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n  box-sizing: border-box;\n"])),function(e){return e.theme.error.background},function(e){return e.theme.error.color}),ne=function(n){/*#__PURE__*/return react.createElement(ee,null,/*#__PURE__*/react.createElement("p",null,n.error))},te=m("div")(D||(D=T(["\n  position: relative;\n  height: 100%;\n"]))),re=/*#__PURE__*/react.memo(function(n){var r=n.id,i=n.snippet,c=n.transformJs,d=n.presets,u=react.useState(""),l=u[0],s=u[1],m=react.useState(null),f=m[0],p=m[1];return react.useMemo(function(){try{var e=function(e,n,t,r){var o=e.javascript;return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8"/>\n      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>\n      <title>Document</title>\n      <style>'+e.css+"</style>\n    </head>\n    <body>\n      "+e.markup+"\n      <span></span>\n      <script>\n        var _privateLog = console.log;\n        console.log = function(...rest) {\n          if(typeof window !== 'undefined') {\n            window.parent.postMessage({\n              source: \"frame-"+n+'",\n              message: {\n                type: "log",\n                data: rest\n              },\n            }, "*");\n          }\n          _privateLog.apply(console, arguments);\n        }\n        window.onerror = function(message) {\n          if(typeof window !== \'undefined\') {\n            window.parent.postMessage({\n              source: "frame-'+n+'",\n              message: {\n                type: "error",\n                data: message\n              },\n            }, "*");\n          }\n        }\n      <\/script>\n      <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>\n      '+(t?'\n        <script type="module">\n          const BareIdentifierFormat = /^((?:@[^\\/]+\\/)?[^\\/]+)(\\/.*)?$/\n\n          function validUrl(url) {\n            try {\n              new URL(url);\n              return true;\n            } catch(err) {\n              return false;\n            }\n          }\n\n          function unpkg(dependencies = {}) {\n            return {\n              visitor: {\n                "ImportDeclaration|ExportNamedDeclaration|ExportAllDeclaration"(path) {\n                  if (\n                    !path.node.source || // Probably a variable declaration\n                    validUrl(path.node.source.value) || // Valid URL\n                    path.node.source.value.substr(0, 2) === "//" || // URL w/o protocol\n                    [".", "/"].indexOf(path.node.source.value.charAt(0)) >= 0 // Local path\n                  )\n                    return; // Leave it alone\n\n                  // A "bare" identifier\n                  const match = BareIdentifierFormat.exec(path.node.source.value);\n                  const packageName = match[1];\n                  const file = match[2] || "";\n\n                  console.warn(\n                    dependencies[packageName],\n                    \'Missing version for package "%s" in dependencies; falling back to "latest"\',\n                    packageName\n                  );\n\n                  const version = dependencies[packageName] || "latest";\n\n                  path.node.source.value = `https://unpkg.com/${packageName}@${version}${file}?module`;\n                }\n              }\n            };\n          }\n\n          Babel.registerPlugin(\'unpkg\', unpkg);\n\n          const code = Babel.transform(decodeURI(`'+encodeURI(o)+"`), {\n            plugins: ['unpkg'],\n            presets: "+JSON.stringify(r)+'  \n          }).code;\n          const script = document.createElement("script");\n          script.type = "module";\n          script.innerHTML = code;\n          document.body.appendChild(script);\n        <\/script>\n      ':"\n        <script>\n          "+o+"\n        <\/script>\n      ")+"\n    </body>\n    </html>\n  "}(i,r,c,d);s(e),p(null);}catch(e){p(e.message);}},[i,c]),react.useEffect(function(){"undefined"!=typeof window&&window.addEventListener("message",function(e){e.data.source==="frame-"+r&&"error"===e.data.message.type&&p(e.data.message.data);});},[r]),/*#__PURE__*/react.createElement(te,null,/*#__PURE__*/react.createElement("iframe",{height:"100%",width:"100%",title:"example",frameBorder:"0",srcDoc:l,loading:"lazy"}),f&&/*#__PURE__*/react.createElement(ne,{error:f}))}),oe=function(n){var r=n.id,i=n.snippet,c=n.presets,d=n.defaultTab,u=n.transformJs,l=n.width,s=react.useState([]),m=s[0],f=s[1],p=react.useMemo(function(){return [{name:"Result",value:"result"},{name:"Console",value:"console"}]},[]);return react.useEffect(function(){"undefined"!=typeof window&&window.addEventListener("message",function(e){e.data.source==="frame-"+r&&"log"===e.data.message.type&&f(function(n){return [].concat(n,e.data.message.data)});});},[r]),/*#__PURE__*/react.createElement(V,{defaultIndex:p.findIndex(function(e){return e.value===d}),style:{width:l}},/*#__PURE__*/react.createElement(X,null,p.map(function(n){/*#__PURE__*/return react.createElement(_,{key:n.value},n.name)})),/*#__PURE__*/react.createElement(q,null,/*#__PURE__*/react.createElement(Y,null,/*#__PURE__*/react.createElement(re,{id:r,snippet:i,transformJs:u,presets:c})),/*#__PURE__*/react.createElement(Y,null,/*#__PURE__*/react.createElement(Z,{logs:m}))))},ae={container:{borderColor:"rgba(0, 0, 0, 0.3)"},error:{background:"#e74c3c",color:"#ffffff"},console:{background:"rgba(0, 0, 0, 1)"},divider:{background:"#202020",dividerBackground:"#202020"},editor:{backgroundColor:"#000000",color:"#ffffff"},tabs:{tabHeader:{background:"transparent",color:"#000000",borderBottom:"0.1em solid rgba(0, 0, 0, 0.1)"}}},ie={container:{borderColor:"rgba(255, 255, 255, 0.4)"},error:{background:"#e74c3c",color:"#ffffff"},console:{background:"rgba(0, 0, 0, 1)"},divider:{background:"rgba(255, 255, 255, 0.5)",dividerBackground:"rgba(255, 255, 255, 0.1)"},editor:{backgroundColor:"#000000",color:"#ffffff"},tabs:{tabHeader:{background:"rgba(1, 21, 21, 0.8)",panelBackground:"rgb(1, 21, 21)",color:"#ffffff",borderBottom:"0.1em solid rgba(255, 255, 255, 0.4)"},selectedTab:{borderBottom:"0.2em solid rgb(255, 255, 255)"}}},ce={container:{borderColor:"",minHeight:"20em",minWidth:"15em"},error:{background:"",color:""},console:{background:"rgba(0, 0, 0, 1)"},divider:{width:4,background:"",dividerBackground:"",containerWidth:8},editor:{fontFamily:"Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace",backgroundColor:"",color:""},tabs:{tabHeader:{borderBottom:"",panelBackground:"",background:"",color:""},tabPanel:{phoneHeight:"10em"},selectedTab:{background:"",borderBottom:"0.2em solid rgb(0, 0, 0)"}}},de=/*#__PURE__*/react.createContext(ce),ue=function(){return react.useContext(de)};function le(n){var t=n.mode,r=n.userTheme,i=n.children,c=react.useState(ce),d=c[0],u=c[1];return react.useEffect(function(){u(function(e){return void 0===e&&(e="light"),lodash_merge(ce,"light"===e?ae:ie)}(t));},[t]),/*#__PURE__*/react.createElement(de.Provider,{value:null!=r?r:d},i)}var se,me=m("div",react.forwardRef)(J||(J=T(["\n  display: flex;\n  align-items: stretch;\n"]))),fe=m("div",react.forwardRef)(M||(M=T(["\n  width: ","px;\n  background-color: ",";\n"])),function(e){return e.theme.divider.containerWidth},function(e){return e.theme.divider.dividerBackground}),pe=m("div",react.forwardRef)(z||(z=T(["\n  width: ","px;\n  cursor: col-resize;\n  background-color: ",";\n  margin: 0 auto;\n  height: 100%;\n"])),function(e){return e.theme.divider.width},function(e){return e.theme.divider.background});h(react.createElement,void 0,ue);var ge=m(function(n){var t=n.className,r=void 0===t?"":t,i=n.leftChild,c=n.rightChild,u=react.useRef(null),s=react.useRef(null),m=function(e){var n=e.containerRef,t=e.dividerRef,r=e.dividerWidth,i=react.useState(0),c=i[0],u=i[1],l=react.useState(null),s=l[0],m=l[1];react.useEffect(function(){var e=n.current;if(e){var t=e.clientWidth,r=e.getBoundingClientRect();m(r),u(t/2);}},[]);var f=react.useCallback(function(e){s&&u(e.clientX-s.left);},[s]),p=react.useCallback(function(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",p);},[f]),g=react.useCallback(function(){document.addEventListener("mousemove",f),document.addEventListener("mouseup",p);},[f,p]);return react.useEffect(function(){var e=t.current;return e&&e.addEventListener("mousedown",g),function(){e&&e.removeEventListener("mousedown",g);}},[g]),{leftWidth:c,rightWidth:s?s.width-c-r:0}}({containerRef:u,dividerRef:s,dividerWidth:ue().divider.width}),f=m.rightWidth;/*#__PURE__*/return react.createElement(me,{className:r,ref:u},i(m.leftWidth),/*#__PURE__*/react.createElement(fe,null,/*#__PURE__*/react.createElement(pe,{ref:s})),c(f))})(se||(se=T(["\n  border: 0.1em solid ",";\n  display: flex;\n  min-height: ",";\n\n  "," {\n    flex-direction: column;\n  }\n"])),function(e){return e.theme.container.borderColor},function(e){return e.theme.container.minHeight},$.phone),he=function(n){var t=n.id,r=n.defaultEditorTab,a=void 0===r?"markup":r,i=n.defaultResultTab,c=void 0===i?"result":i,d=n.transformJs,u=void 0!==d&&d,l=n.presets,s=void 0===l?[]:l,f=n.theme,p=n.mode,g=void 0===p?"light":p,h=react.useState(n.initialSnippet),b=h[0],v=h[1],k=useId(t),w=function(e,n){v(function(t){var r;return L({},t,((r={})[n]=e,r))});};/*#__PURE__*/return react.createElement(le,{userTheme:f,mode:g},/*#__PURE__*/react.createElement("div",{className:"playground"},/*#__PURE__*/react.createElement(ge,{leftChild:function(n){/*#__PURE__*/return react.createElement(K,{width:n,code:b,defaultTab:a,onChange:w})},rightChild:function(n){/*#__PURE__*/return react.createElement(oe,{width:n,id:k,snippet:b,defaultTab:c,transformJs:u,presets:s})}})))};

export default he;
