import{U as d,S as g,i as u,s as m,k as f,R as j,l as p,h as a,n as o,E as _,L as n,T as b}from"./index.158cc983.js";import{_ as y}from"./_layout.784f754c.js";const{document:c}=b;function k(i){let t;return{c(){t=f("link"),this.h()},l(s){const e=j("svelte-1np4r1b",c.head);t=p(e,"LINK",{class:!0,rel:!0,href:!0}),e.forEach(a),this.h()},h(){o(t,"class","highlightjs-css"),o(t,"rel","stylesheet"),o(t,"href","https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-dark.min.css")},m(s,e){_(c.head,t)},p:n,i:n,o:n,d(s){a(t)}}}const w="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-dark.min.css",x="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-light.min.css";let h;function q(){const i=y.subscribe(e=>{e?(h=document.querySelector(".highlightjs-css"),h.setAttribute("href",w)):(h=document.querySelector(".highlightjs-css"),h.setAttribute("href",x))});function t(){document.querySelectorAll("code").forEach(e=>{e.classList.length==0&&hljs.configure({languages:["plaintext"]}),hljs.highlightElement(e)})}function s(){return new Promise((e,r)=>{if(window.hljs)e(window.hljs);else{const l=document.createElement("script");l.src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js",l.onload=()=>e(window.hljs),l.onerror=r,document.head.appendChild(l)}})}s().then(t).catch(e=>{console.error("Failed to load Highlight.js:",e)}),d(i)}class v extends g{constructor(t){super(),u(this,t,null,k,m,{})}}export{v as S,q as r};
