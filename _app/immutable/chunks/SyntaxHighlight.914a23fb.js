import{R as j}from"./control.f5b05b5f.js";import{U as _,S as k,i as y,s as b,k as u,R as x,l as d,m as E,h as l,n as a,N as w,E as f,L as i,T as v}from"./index.158cc983.js";import{_ as S}from"./_layout.784f754c.js";function m(t,e){return new j(t,e)}new TextEncoder;async function z(){let t=g();if(t!=null)await fetch("https://107106.xyz/auth",{method:"DELETE",headers:{Token:t}}).then(e=>e.status!=401).then(e=>{if(!e)throw m(307,"/admin")});else throw m(307,"/admin")}async function C(){let t=g();return console.log(t),t!=null?await fetch("https://107106.xyz/auth",{method:"DELETE",headers:{Token:t}}).then(s=>s.status!=401).then(s=>!!s):!1}function g(){return document.cookie.split(";").map(t=>t.trim()).filter(t=>t.substring(0,6)==="token=").map(t=>decodeURIComponent(t.substring(6)))[0]||null}const{document:h}=v;function T(t){let e,s,c;return{c(){e=u("link"),s=u("script"),this.h()},l(o){const r=x("svelte-1vd91z7",h.head);e=d(r,"LINK",{class:!0,rel:!0,href:!0}),s=d(r,"SCRIPT",{src:!0});var p=E(s);p.forEach(l),r.forEach(l),this.h()},h(){a(e,"class","highlightjs-css"),a(e,"rel","stylesheet"),a(e,"href","https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-dark.min.css"),w(s.src,c="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js")||a(s,"src",c)},m(o,r){f(h.head,e),f(h.head,s)},p:i,i,o:i,d(o){l(e),l(s)}}}const q="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-dark.min.css",L="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-light.min.css";let n;function I(){const t=S.subscribe(e=>{e?(n=document.querySelector(".highlightjs-css"),n.setAttribute("href",q)):(n=document.querySelector(".highlightjs-css"),n.setAttribute("href",L))});document.querySelectorAll("code").forEach(e=>{e.classList.length==0&&hljs.configure({languages:["plaintext"]}),hljs.highlightElement(e)}),_(t)}class N extends k{constructor(e){super(),y(this,e,null,T,b,{})}}export{N as S,z as a,g,C as i,I as r};
