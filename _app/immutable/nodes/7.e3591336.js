import{a as ue,S as pe,r as me,g as ve}from"../chunks/SyntaxHighlight.914a23fb.js";import{S as fe,i as _e,s as he,k as o,a as x,y as ge,q,R as we,l as i,m as d,h as t,c as j,z as ke,r as M,n as u,N as ee,E as s,b as P,A as ye,F as K,L as be,g as Te,d as Se,B as Ee,O as xe,o as je,T as $e}from"../chunks/index.158cc983.js";import{g as oe}from"../chunks/navigation.afb57683.js";async function Ie({fetch:f,params:c}){return await ue(),{content:await f(`https://107106.xyz/blog/${c.slug}`).then(h=>h.json())}}const Ce=Object.freeze(Object.defineProperty({__proto__:null,load:Ie},Symbol.toStringTag,{value:"Module"}));const{document:V}=$e;function Oe(f){let c,_,h,p,X,g,a,y,w,$,k,H,l,r,n,m,b,C,T,I,z,S,L,Y,O,G,E,D,J,Q,N,W,B,Z,te;return w=new pe({}),{c(){c=o("link"),_=o("script"),p=o("script"),g=o("script"),y=x(),ge(w.$$.fragment),$=x(),k=o("h1"),H=q("editor"),l=x(),r=o("div"),n=o("div"),m=o("button"),b=q("edit"),C=x(),T=o("button"),I=q("preview"),z=x(),S=o("div"),L=o("div"),Y=x(),O=o("textarea"),G=x(),E=o("div"),D=o("button"),J=q("cancel"),Q=x(),N=o("button"),W=q("save"),this.h()},l(e){const v=we("svelte-10tpdyr",V.head);c=i(v,"LINK",{rel:!0,href:!0,integrity:!0,crossorigin:!0}),_=i(v,"SCRIPT",{src:!0});var ie=d(_);ie.forEach(t),p=i(v,"SCRIPT",{src:!0});var ce=d(p);ce.forEach(t),g=i(v,"SCRIPT",{src:!0});var de=d(g);de.forEach(t),v.forEach(t),y=j(e),ke(w.$$.fragment,e),$=j(e),k=i(e,"H1",{class:!0});var se=d(k);H=M(se,"editor"),se.forEach(t),l=j(e),r=i(e,"DIV",{class:!0});var U=d(r);n=i(U,"DIV",{class:!0});var R=d(n);m=i(R,"BUTTON",{});var ae=d(m);b=M(ae,"edit"),ae.forEach(t),C=j(R),T=i(R,"BUTTON",{});var re=d(T);I=M(re,"preview"),re.forEach(t),R.forEach(t),z=j(U),S=i(U,"DIV",{class:!0});var A=d(S);L=i(A,"DIV",{class:!0}),d(L).forEach(t),Y=j(A),O=i(A,"TEXTAREA",{class:!0}),d(O).forEach(t),A.forEach(t),G=j(U),E=i(U,"DIV",{class:!0});var F=d(E);D=i(F,"BUTTON",{});var ne=d(D);J=M(ne,"cancel"),ne.forEach(t),Q=j(F),N=i(F,"BUTTON",{});var le=d(N);W=M(le,"save"),le.forEach(t),F.forEach(t),U.forEach(t),this.h()},h(){u(c,"rel","stylesheet"),u(c,"href","https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css"),u(c,"integrity","sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X"),u(c,"crossorigin","anonymous"),ee(_.src,h="//cdn.jsdelivr.net/npm/marked/marked.min.js")||u(_,"src",h),ee(p.src,X="//cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js")||u(p,"src",X),ee(g.src,a="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js")||u(g,"src",a),u(k,"class","svelte-wwn397"),u(n,"class","markdown-header"),u(L,"class","preview"),O.value=f[0],u(O,"class","svelte-wwn397"),u(S,"class","markdown-body svelte-wwn397"),u(E,"class","markdown-footer"),u(r,"class","markdown-editor svelte-wwn397")},m(e,v){s(V.head,c),s(V.head,_),s(V.head,p),s(V.head,g),P(e,y,v),ye(w,e,v),P(e,$,v),P(e,k,v),s(k,H),P(e,l,v),P(e,r,v),s(r,n),s(n,m),s(m,b),s(n,C),s(n,T),s(T,I),s(r,z),s(r,S),s(S,L),s(S,Y),s(S,O),s(r,G),s(r,E),s(E,D),s(D,J),s(E,Q),s(E,N),s(N,W),B=!0,Z||(te=[K(m,"click",f[2]),K(T,"click",f[1]),K(D,"click",f[3]),K(N,"click",f[4])],Z=!0)},p:be,i(e){B||(Te(w.$$.fragment,e),B=!0)},o(e){Se(w.$$.fragment,e),B=!1},d(e){t(c),t(_),t(p),t(g),e&&t(y),Ee(w,e),e&&t($),e&&t(k),e&&t(l),e&&t(r),Z=!1,xe(te)}}}function De(f,c,_){let{data:h}=c,p=new Date(Date.now()),g=`---
title: 
tags: [ ]
date: ${`${p.toISOString().split("T")[0]} ${p.toString().split(" ")[4]} -${p.toString().split("-")[1].slice(0,2)}:${p.toString().split("-")[1].slice(2,5)}`}
---
`,a,y;function w(){const l=/^---[\s\S]*?---\s*/m,r=a.value.replace(l,""),n={throwOnError:!1},m={mangle:!1,headerIds:!1};marked.use(markedKatex(n),m);let b=marked.parse(r);console.log(b),a.style.display="none",y.innerHTML=b,me()}function $(){a.style.display="block",y.innerHTML=""}function k(){oe("/blog")}function H(){try{let l=a.value,r=l.split("---")[1],n=jsyaml.load(r),m={Id:h.content.Id,Title:n.title,Date:n.date,MarkDown:l,Tags:n.tags,Html:"",Url:""};const b=/^---[\s\S]*?---\s*/m,C=a.value.replace(b,""),T={throwOnError:!1};marked.use(markedKatex(T)),m.Html=marked.parse(C),m.Url=`${n.date.toISOString().split("T")[0]}-${n.title.replaceAll(" ","-")}`;let I=ve();const z=fetch("https://107106.xyz/blog/",{method:"PUT",body:JSON.stringify(m),headers:{"Content-Type":"application/json",Token:I??""}}).then(()=>{oe("/blog")})}catch(l){window.alert(l.message)}}return je(()=>{a=document.querySelector("textarea"),y=document.querySelector(".preview"),a.addEventListener("keydown",l=>{if(l.key==="Tab"){const r=a.selectionStart,n=a.selectionEnd;a.value=a.value.substring(0,r)+"	"+a.value.substring(n),a.selectionStart=a.selectionEnd=r+1,l.preventDefault()}}),a.value=h.content.MarkDown}),f.$$set=l=>{"data"in l&&_(5,h=l.data)},[g,w,$,k,H,h]}class Le extends fe{constructor(c){super(),_e(this,c,De,Oe,he,{data:5})}}export{Le as component,Ce as universal};
