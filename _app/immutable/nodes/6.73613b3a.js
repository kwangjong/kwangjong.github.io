import{a as ut,g as pt}from"../chunks/auth.a5305361.js";import{S as mt,i as vt,s as ft,k as o,a as x,y as _t,q as L,R as ht,l as c,m as u,h as e,c as j,z as gt,r as V,n as p,N as tt,E as s,b as q,A as yt,F as G,L as bt,g as wt,d as kt,B as Tt,O as St,o as Et,T as xt}from"../chunks/index.158cc983.js";import{S as jt,r as $t}from"../chunks/SyntaxHighlight.426c2788.js";import{g as it}from"../chunks/navigation.4ec3ce5c.js";async function It({fetch:_,url:d}){await ut();const m=d.searchParams.get("edit");return m!=null?{content:await _(`https://107106.xyz/blog/${m}`).then(i=>i.json())}:{content:null}}const Pt=Object.freeze(Object.defineProperty({__proto__:null,load:It},Symbol.toStringTag,{value:"Module"}));const{document:z}=xt;function Ot(_){let d,m,f,i,K,g,r,T,y,$,b,U,l,n,a,w,h,H,S,P,I,k,C,X,O,Y,E,D,J,Q,M,W,B,Z,et;return y=new jt({}),{c(){d=o("link"),m=o("script"),i=o("script"),g=o("script"),T=x(),_t(y.$$.fragment),$=x(),b=o("h1"),U=L("editor"),l=x(),n=o("div"),a=o("div"),w=o("button"),h=L("edit"),H=x(),S=o("button"),P=L("preview"),I=x(),k=o("div"),C=o("div"),X=x(),O=o("textarea"),Y=x(),E=o("div"),D=o("button"),J=L("cancel"),Q=x(),M=o("button"),W=L("save"),this.h()},l(t){const v=ht("svelte-10tpdyr",z.head);d=c(v,"LINK",{rel:!0,href:!0,integrity:!0,crossorigin:!0}),m=c(v,"SCRIPT",{src:!0});var ot=u(m);ot.forEach(e),i=c(v,"SCRIPT",{src:!0});var ct=u(i);ct.forEach(e),g=c(v,"SCRIPT",{src:!0});var dt=u(g);dt.forEach(e),v.forEach(e),T=j(t),gt(y.$$.fragment,t),$=j(t),b=c(t,"H1",{class:!0});var st=u(b);U=V(st,"editor"),st.forEach(e),l=j(t),n=c(t,"DIV",{class:!0});var N=u(n);a=c(N,"DIV",{class:!0});var R=u(a);w=c(R,"BUTTON",{});var at=u(w);h=V(at,"edit"),at.forEach(e),H=j(R),S=c(R,"BUTTON",{});var rt=u(S);P=V(rt,"preview"),rt.forEach(e),R.forEach(e),I=j(N),k=c(N,"DIV",{class:!0});var A=u(k);C=c(A,"DIV",{class:!0}),u(C).forEach(e),X=j(A),O=c(A,"TEXTAREA",{class:!0}),u(O).forEach(e),A.forEach(e),Y=j(N),E=c(N,"DIV",{class:!0});var F=u(E);D=c(F,"BUTTON",{});var nt=u(D);J=V(nt,"cancel"),nt.forEach(e),Q=j(F),M=c(F,"BUTTON",{});var lt=u(M);W=V(lt,"save"),lt.forEach(e),F.forEach(e),N.forEach(e),this.h()},h(){p(d,"rel","stylesheet"),p(d,"href","https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"),p(d,"integrity","sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X"),p(d,"crossorigin","anonymous"),tt(m.src,f="//cdn.jsdelivr.net/npm/marked/marked.min.js")||p(m,"src",f),tt(i.src,K="//cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js")||p(i,"src",K),tt(g.src,r="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js")||p(g,"src",r),p(b,"class","svelte-wwn397"),p(a,"class","markdown-header"),p(C,"class","preview"),O.value=_[0],p(O,"class","svelte-wwn397"),p(k,"class","markdown-body svelte-wwn397"),p(E,"class","markdown-footer"),p(n,"class","markdown-editor svelte-wwn397")},m(t,v){s(z.head,d),s(z.head,m),s(z.head,i),s(z.head,g),q(t,T,v),yt(y,t,v),q(t,$,v),q(t,b,v),s(b,U),q(t,l,v),q(t,n,v),s(n,a),s(a,w),s(w,h),s(a,H),s(a,S),s(S,P),s(n,I),s(n,k),s(k,C),s(k,X),s(k,O),s(n,Y),s(n,E),s(E,D),s(D,J),s(E,Q),s(E,M),s(M,W),B=!0,Z||(et=[G(w,"click",_[2]),G(S,"click",_[1]),G(D,"click",_[3]),G(M,"click",_[4])],Z=!0)},p:bt,i(t){B||(wt(y.$$.fragment,t),B=!0)},o(t){kt(y.$$.fragment,t),B=!1},d(t){e(d),e(m),e(i),e(g),t&&e(T),Tt(y,t),t&&e($),t&&e(b),t&&e(l),t&&e(n),Z=!1,St(et)}}}function Dt(_,d,m){let{data:f}=d,i=new Date(Date.now());console.log(i.toString().split("GMT")[1].slice(3,5));let g=`---
title: 
tags: [ ]
date: ${`${i.toISOString().split("T")[0]} ${i.toString().split(" ")[4]} ${i.toString().split("GMT")[1].slice(0,3)}:${i.toString().split("GMT")[1].slice(3,5)}`}
visibility: public #private unlisted
---
`,r,T;function y(){const l=/^---[\s\S]*?---\s*/m,n=r.value.replace(l,""),a={throwOnError:!1},w={mangle:!1,headerIds:!1};marked.use(markedKatex(a),w);let h=marked.parse(n);console.log(h),r.style.display="none",T.innerHTML=h,$t()}function $(){r.style.display="block",T.innerHTML=""}function b(){it("/blog")}function U(){try{let l=r.value,n=l.split("---")[1],a=jsyaml.load(n);if(!["public","private","unlisted"].includes(a.visibility))throw new Error("visibillty should be either 'public', 'private', or 'unlisted'");let h={Id:f.content==null?null:f.content.Id,Title:a.title,Date:a.date,MarkDown:l,Tags:a.tags,Html:"",Url:"",Visibility:a.visibility};const H=/^---[\s\S]*?---\s*/m,S=r.value.replace(H,""),P={throwOnError:!1};marked.use(markedKatex(P)),h.Html=marked.parse(S),h.Url=`${a.date.toISOString().split("T")[0]}-${a.title.replaceAll(" ","-")}`;let I=pt();const k=fetch("https://107106.xyz/blog/",{method:f.content==null?"POST":"PUT",body:JSON.stringify(h),headers:{"Content-Type":"application/json",Token:I??""}}).then(()=>{it("/blog")})}catch(l){window.alert(l.message)}}return Et(()=>{r=document.querySelector("textarea"),T=document.querySelector(".preview"),r.addEventListener("keydown",l=>{if(l.key==="Tab"){const n=r.selectionStart,a=r.selectionEnd;r.value=r.value.substring(0,n)+"	"+r.value.substring(a),r.selectionStart=r.selectionEnd=n+1,l.preventDefault()}}),f.content!=null&&(r.value=f.content.MarkDown)}),_.$$set=l=>{"data"in l&&m(5,f=l.data)},[g,y,$,b,U,f]}class Ct extends mt{constructor(d){super(),vt(this,d,Dt,Ot,ft,{data:5})}}export{Ct as component,Pt as universal};
