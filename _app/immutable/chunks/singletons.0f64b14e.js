import{w as u}from"./index.61261dd2.js";var _;const k=((_=globalThis.__sveltekit_1xybxx4)==null?void 0:_.base)??"/sveltekit-github-pages";var g;const x=((g=globalThis.__sveltekit_1xybxx4)==null?void 0:g.assets)??k,m="1697012589157",A="sveltekit:snapshot",R="sveltekit:scroll",T="sveltekit:index",f={tap:1,hover:2,viewport:3,eager:4,off:-1};function I(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function S(){return{x:pageXOffset,y:pageYOffset}}function c(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const d={...f,"":f.hover};function h(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function O(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=h(e)}}function U(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,l=!n||!!o||y(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),r=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:l,target:o,download:r}}function L(e){let t=null,n=null,o=null,l=null,r=null,a=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=c(s,"preload-code")),l===null&&(l=c(s,"preload-data")),t===null&&(t=c(s,"keepfocus")),n===null&&(n=c(s,"noscroll")),r===null&&(r=c(s,"reload")),a===null&&(a=c(s,"replacestate")),s=h(s);function i(v){switch(v){case"":case"true":return!0;case"off":case"false":return!1;default:return null}}return{preload_code:d[o??"off"],preload_data:d[l??"off"],keep_focus:i(t),noscroll:i(n),reload:i(r),replace_state:i(a)}}function p(e){const t=u(e);let n=!0;function o(){n=!0,t.update(a=>a)}function l(a){n=!1,t.set(a)}function r(a){let s;return t.subscribe(i=>{(s===void 0||n&&i!==s)&&a(s=i)})}return{notify:o,set:l,subscribe:r}}function w(){const{set:e,subscribe:t}=u(!1);let n;async function o(){clearTimeout(n);try{const l=await fetch(`${x}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!l.ok)return!1;const a=(await l.json()).version!==m;return a&&(e(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:t,check:o}}function y(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let b;function N(e){b=e.client}function P(e){return(...t)=>b[e](...t)}const V={url:p({}),page:p({}),navigating:u(null),updated:w()};export{T as I,f as P,R as S,A as a,U as b,L as c,V as d,k as e,O as f,I as g,N as h,y as i,P as j,S as s};
