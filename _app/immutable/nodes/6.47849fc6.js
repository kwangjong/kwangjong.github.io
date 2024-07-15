import{S as ut,i as pt,s as mt,k as n,a as T,y as vt,q as M,R as ft,l as i,m as d,h as s,c as S,z as ht,r as P,n as u,N as tt,E as r,b as C,A as _t,F as K,L as wt,g as yt,d as gt,B as bt,O as kt,o as Tt,T as St}from"../chunks/index.158cc983.js";import{S as Et,r as xt}from"../chunks/SyntaxHighlight.426c2788.js";import{g as $t,a as jt}from"../chunks/auth.3ff9f89f.js";import{g as it}from"../chunks/navigation.1364687b.js";const{document:V}=St;function It(E){let l,w,q,a,x,f,R,$,h,y,_,o,c,t,v,p,N,H,g,j,B,b,L,X,I,Y,k,D,J,Q,O,W,z,Z,et;return h=new Et({}),{c(){l=n("link"),w=n("script"),a=n("script"),f=n("script"),$=T(),vt(h.$$.fragment),y=T(),_=n("h1"),o=M("editor"),c=T(),t=n("div"),v=n("div"),p=n("button"),N=M("edit"),H=T(),g=n("button"),j=M("preview"),B=T(),b=n("div"),L=n("div"),X=T(),I=n("textarea"),Y=T(),k=n("div"),D=n("button"),J=M("cancel"),Q=T(),O=n("button"),W=M("save"),this.h()},l(e){const m=ft("svelte-10tpdyr",V.head);l=i(m,"LINK",{rel:!0,href:!0,integrity:!0,crossorigin:!0}),w=i(m,"SCRIPT",{src:!0});var ot=d(w);ot.forEach(s),a=i(m,"SCRIPT",{src:!0});var ct=d(a);ct.forEach(s),f=i(m,"SCRIPT",{src:!0});var dt=d(f);dt.forEach(s),m.forEach(s),$=S(e),ht(h.$$.fragment,e),y=S(e),_=i(e,"H1",{class:!0});var st=d(_);o=P(st,"editor"),st.forEach(s),c=S(e),t=i(e,"DIV",{class:!0});var U=d(t);v=i(U,"DIV",{class:!0});var A=d(v);p=i(A,"BUTTON",{});var at=d(p);N=P(at,"edit"),at.forEach(s),H=S(A),g=i(A,"BUTTON",{});var rt=d(g);j=P(rt,"preview"),rt.forEach(s),A.forEach(s),B=S(U),b=i(U,"DIV",{class:!0});var F=d(b);L=i(F,"DIV",{class:!0}),d(L).forEach(s),X=S(F),I=i(F,"TEXTAREA",{class:!0}),d(I).forEach(s),F.forEach(s),Y=S(U),k=i(U,"DIV",{class:!0});var G=d(k);D=i(G,"BUTTON",{});var lt=d(D);J=P(lt,"cancel"),lt.forEach(s),Q=S(G),O=i(G,"BUTTON",{});var nt=d(O);W=P(nt,"save"),nt.forEach(s),G.forEach(s),U.forEach(s),this.h()},h(){u(l,"rel","stylesheet"),u(l,"href","https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"),u(l,"integrity","sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X"),u(l,"crossorigin","anonymous"),tt(w.src,q="//cdn.jsdelivr.net/npm/marked/marked.min.js")||u(w,"src",q),tt(a.src,x="//cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js")||u(a,"src",x),tt(f.src,R="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js")||u(f,"src",R),u(_,"class","svelte-wwn397"),u(v,"class","markdown-header"),u(L,"class","preview"),I.value=E[0],u(I,"class","svelte-wwn397"),u(b,"class","markdown-body svelte-wwn397"),u(k,"class","markdown-footer"),u(t,"class","markdown-editor svelte-wwn397")},m(e,m){r(V.head,l),r(V.head,w),r(V.head,a),r(V.head,f),C(e,$,m),_t(h,e,m),C(e,y,m),C(e,_,m),r(_,o),C(e,c,m),C(e,t,m),r(t,v),r(v,p),r(p,N),r(v,H),r(v,g),r(g,j),r(t,B),r(t,b),r(b,L),r(b,X),r(b,I),r(t,Y),r(t,k),r(k,D),r(D,J),r(k,Q),r(k,O),r(O,W),z=!0,Z||(et=[K(p,"click",E[2]),K(g,"click",E[1]),K(D,"click",E[3]),K(O,"click",E[4])],Z=!0)},p:wt,i(e){z||(yt(h.$$.fragment,e),z=!0)},o(e){gt(h.$$.fragment,e),z=!1},d(e){s(l),s(w),s(a),s(f),e&&s($),bt(h,e),e&&s(y),e&&s(_),e&&s(c),e&&s(t),Z=!1,kt(et)}}}function Dt(E){let l=new Date(Date.now());console.log(l.toString().split("GMT")[1].slice(3,5));let q=`---
title: 
tags: [ ]
date: ${`${l.toISOString().split("T")[0]} ${l.toString().split(" ")[4]} ${l.toString().split("GMT")[1].slice(0,3)}:${l.toString().split("GMT")[1].slice(3,5)}`}
visibility: public #private unlisted
---
`,a,x;function f(){const o=/^---[\s\S]*?---\s*/m,c=a.value.replace(o,""),t={throwOnError:!1},v={mangle:!1,headerIds:!1};marked.use(markedKatex(t),v);let p=marked.parse(c);console.log(p),a.style.display="none",x.innerHTML=p,xt()}function R(){a.style.display="block",x.innerHTML=""}function $(){it("/blog")}function h(){try{let o=a.value,c=o.split("---")[1],t=jsyaml.load(c);if(!["public","private","unlisted"].includes(t.visibility))throw new Error("visibillty should be either 'public', 'private', or 'unlisted'");let p={Id:data.content==null?null:data.content.Id,Title:t.title,Date:t.date,MarkDown:o,Tags:t.tags,Html:"",Url:"",Visibility:t.visibility};const N=/^---[\s\S]*?---\s*/m,H=a.value.replace(N,""),g={throwOnError:!1};marked.use(markedKatex(g)),p.Html=marked.parse(H),p.Url=`${t.date.toISOString().split("T")[0]}-${t.title.replaceAll(" ","-")}`;let j=$t();const B=fetch("https://107106.xyz/blog/",{method:data.content==null?"POST":"PUT",body:JSON.stringify(p),headers:{"Content-Type":"application/json",Token:j??""}}).then(()=>{it("/blog")})}catch(o){window.alert(o.message)}}let y=null;async function _(){await jt();const c=new URL(window.location.href).searchParams.get("edit");c!=null&&(y=await fetch(`https://107106.xyz/blog/${c}`).then(t=>t.json()))}return Tt(async()=>{await _(),a=document.querySelector("textarea"),x=document.querySelector(".preview"),a.addEventListener("keydown",o=>{if(o.key==="Tab"){const c=a.selectionStart,t=a.selectionEnd;a.value=a.value.substring(0,c)+"	"+a.value.substring(t),a.selectionStart=a.selectionEnd=c+1,o.preventDefault()}}),y!=null&&(a.value=y.MarkDown)}),[q,f,R,$,h]}class Lt extends ut{constructor(l){super(),pt(this,l,Dt,It,mt,{})}}export{Lt as component};
