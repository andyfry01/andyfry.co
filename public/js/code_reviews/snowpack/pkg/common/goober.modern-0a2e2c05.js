let e={data:""},t=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||e,l=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,a=/\/\*[^]*?\*\/|\s\s+|\n/g,n=(e,t)=>{let r="",l="",a="";for(let o in e){let s=e[o];"@"==o[0]?"i"==o[1]?r=o+" "+s+";":l+="f"==o[1]?n(s,o):o+"{"+n(s,"k"==o[1]?"":t)+"}":"object"==typeof s?l+=n(s,t?t.replace(/([^,])+/g,e=>o.replace(/(^:.*)|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):o):null!=s&&(o=o.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=n.p?n.p(o,s):o+":"+s+";");}return r+(t&&a?t+"{"+a+"}":a)+l},o={},s=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+s(e[r]);return t}return e},c=(e,t,r,c,i)=>{let u=s(e),p=o[u]||(o[u]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return "go"+r})(u));if(!o[p]){let t=u!==e?e:(e=>{let t,r=[{}];for(;t=l.exec(e.replace(a,""));)t[4]?r.shift():t[3]?r.unshift(r[0][t[3]]=r[0][t[3]]||{}):r[0][t[1]]=t[2];return r[0]})(e);o[p]=n(i?{["@keyframes "+p]:t}:t,r?"":"."+p);}return ((e,t,r)=>{-1==t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e);})(o[p],t,c),p},i=(e,t,r)=>e.reduce((e,l,a)=>{let o=t[a];if(o&&o.call){let e=o(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;o=t?"."+t:e&&"object"==typeof e?e.props?"":n(e,""):!1===e?"":e;}return e+l+(null==o?"":o)},"");function u(e){let r=this||{},l=e.call?e(r.p):e;return c(l.unshift?l.raw?i(l,[].slice.call(arguments,1),r.p):l.reduce((e,t)=>Object.assign(e,t&&t.call?t(r.p):t),{}):l,t(r.target),r.g,r.o,r.k)}let p,d,f,g=u.bind({g:1}),b=u.bind({k:1});function h(e,t,r,l){n.p=t,p=e,d=r,f=l;}function m(e,t){let r=this||{};return function(){let l=arguments;function a(n,o){let s=Object.assign({},n),c=s.className||a.className;r.p=Object.assign({theme:d&&d()},s),r.o=/ *go\d+/.test(c),s.className=u.apply(r,l)+(c?" "+c:""),t&&(s.ref=o);let i=e;return e[0]&&(i=s.as||e,delete s.as),f&&i[0]&&f(s),p(i,s)}return t?t(a):a}}

export { h, m };