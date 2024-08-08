import{S as ut,i as pt,s as mt,k as n,a as T,y as vt,q as M,R as ft,l as i,m as d,h as s,c as S,z as ht,r as P,n as u,N as tt,E as l,b as C,A as _t,F as G,L as wt,g as yt,d as gt,B as bt,O as kt,o as Tt,T as St}from"../chunks/index.158cc983.js";import{S as Et,r as xt}from"../chunks/SyntaxHighlight.de7da01e.js";import{g as $t}from"../chunks/auth.1300090c.js";import{g as it}from"../chunks/navigation.dba53731.js";const{document:V}=St;function jt(E){let r,y,q,a,x,h,R,$,_,v,w,o,c,t,f,p,N,H,g,j,A,b,L,X,I,Y,k,D,J,Q,O,W,B,Z,et;return _=new Et({}),{c(){r=n("link"),y=n("script"),a=n("script"),h=n("script"),$=T(),vt(_.$$.fragment),v=T(),w=n("h1"),o=M("editor"),c=T(),t=n("div"),f=n("div"),p=n("button"),N=M("edit"),H=T(),g=n("button"),j=M("preview"),A=T(),b=n("div"),L=n("div"),X=T(),I=n("textarea"),Y=T(),k=n("div"),D=n("button"),J=M("cancel"),Q=T(),O=n("button"),W=M("save"),this.h()},l(e){const m=ft("svelte-10tpdyr",V.head);r=i(m,"LINK",{rel:!0,href:!0,integrity:!0,crossorigin:!0}),y=i(m,"SCRIPT",{src:!0});var ot=d(y);ot.forEach(s),a=i(m,"SCRIPT",{src:!0});var ct=d(a);ct.forEach(s),h=i(m,"SCRIPT",{src:!0});var dt=d(h);dt.forEach(s),m.forEach(s),$=S(e),ht(_.$$.fragment,e),v=S(e),w=i(e,"H1",{class:!0});var st=d(w);o=P(st,"editor"),st.forEach(s),c=S(e),t=i(e,"DIV",{class:!0});var U=d(t);f=i(U,"DIV",{class:!0});var z=d(f);p=i(z,"BUTTON",{});var at=d(p);N=P(at,"edit"),at.forEach(s),H=S(z),g=i(z,"BUTTON",{});var lt=d(g);j=P(lt,"preview"),lt.forEach(s),z.forEach(s),A=S(U),b=i(U,"DIV",{class:!0});var F=d(b);L=i(F,"DIV",{class:!0}),d(L).forEach(s),X=S(F),I=i(F,"TEXTAREA",{class:!0}),d(I).forEach(s),F.forEach(s),Y=S(U),k=i(U,"DIV",{class:!0});var K=d(k);D=i(K,"BUTTON",{});var rt=d(D);J=P(rt,"cancel"),rt.forEach(s),Q=S(K),O=i(K,"BUTTON",{});var nt=d(O);W=P(nt,"save"),nt.forEach(s),K.forEach(s),U.forEach(s),this.h()},h(){u(r,"rel","stylesheet"),u(r,"href","https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"),u(r,"integrity","sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X"),u(r,"crossorigin","anonymous"),tt(y.src,q="//cdn.jsdelivr.net/npm/marked/marked.min.js")||u(y,"src",q),tt(a.src,x="//cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js")||u(a,"src",x),tt(h.src,R="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js")||u(h,"src",R),u(w,"class","svelte-wwn397"),u(f,"class","markdown-header"),u(L,"class","preview"),I.value=E[0],u(I,"class","svelte-wwn397"),u(b,"class","markdown-body svelte-wwn397"),u(k,"class","markdown-footer"),u(t,"class","markdown-editor svelte-wwn397")},m(e,m){l(V.head,r),l(V.head,y),l(V.head,a),l(V.head,h),C(e,$,m),_t(_,e,m),C(e,v,m),C(e,w,m),l(w,o),C(e,c,m),C(e,t,m),l(t,f),l(f,p),l(p,N),l(f,H),l(f,g),l(g,j),l(t,A),l(t,b),l(b,L),l(b,X),l(b,I),l(t,Y),l(t,k),l(k,D),l(D,J),l(k,Q),l(k,O),l(O,W),B=!0,Z||(et=[G(p,"click",E[2]),G(g,"click",E[1]),G(D,"click",E[3]),G(O,"click",E[4])],Z=!0)},p:wt,i(e){B||(yt(_.$$.fragment,e),B=!0)},o(e){gt(_.$$.fragment,e),B=!1},d(e){s(r),s(y),s(a),s(h),e&&s($),bt(_,e),e&&s(v),e&&s(w),e&&s(c),e&&s(t),Z=!1,kt(et)}}}function It(E){let r=new Date(Date.now());console.log(r.toString().split("GMT")[1].slice(3,5));let q=`---
title: 
tags: [ ]
date: ${`${r.toISOString().split("T")[0]} ${r.toString().split(" ")[4]} ${r.toString().split("GMT")[1].slice(0,3)}:${r.toString().split("GMT")[1].slice(3,5)}`}
visibility: public #private unlisted
---
`,a,x;function h(){const o=/^---[\s\S]*?---\s*/m,c=a.value.replace(o,""),t={throwOnError:!1},f={mangle:!1,headerIds:!1};marked.use(markedKatex(t),f);let p=marked.parse(c);console.log(p),a.style.display="none",x.innerHTML=p,xt()}function R(){a.style.display="block",x.innerHTML=""}function $(){it("/blog")}function _(){try{let o=a.value,c=o.split("---")[1],t=jsyaml.load(c);if(!["public","private","unlisted"].includes(t.visibility))throw new Error("visibillty should be either 'public', 'private', or 'unlisted'");let p={Id:v==null?null:v.Id,Title:t.title,Date:t.date,MarkDown:o,Tags:t.tags,Html:"",Url:"",Visibility:t.visibility};const N=/^---[\s\S]*?---\s*/m,H=a.value.replace(N,""),g={throwOnError:!1};marked.use(markedKatex(g)),p.Html=marked.parse(H),p.Url=`${t.date.toISOString().split("T")[0]}-${t.title.replaceAll(" ","-")}`;let j=$t();const A=fetch("https://107106.xyz/blog/",{method:v==null?"POST":"PUT",body:JSON.stringify(p),headers:{"Content-Type":"application/json",Token:j??""}}).then(()=>{it("/blog")})}catch(o){window.alert(o.message)}}let v=null;async function w(){const c=new URL(window.location.href).searchParams.get("edit");c!=null&&(v=await fetch(`https://107106.xyz/blog/${c}`).then(t=>t.json()))}return Tt(async()=>{await isAuthed()||(window.location.href="/admin"),await w(),a=document.querySelector("textarea"),x=document.querySelector(".preview"),a.addEventListener("keydown",o=>{if(o.key==="Tab"){const c=a.selectionStart,t=a.selectionEnd;a.value=a.value.substring(0,c)+"	"+a.value.substring(t),a.selectionStart=a.selectionEnd=c+1,o.preventDefault()}}),v!=null&&(a.value=v.MarkDown)}),[q,h,R,$,_]}class Ht extends ut{constructor(r){super(),pt(this,r,It,jt,mt,{})}}export{Ht as component};
