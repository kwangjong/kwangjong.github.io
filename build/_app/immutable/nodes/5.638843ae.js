import{S as P,i as O,s as j,y as L,a as v,k as _,Q as M,z as N,c as y,l as g,m as b,R as C,h as f,n as E,A as U,b as p,E as h,g as V,d as q,B as z,q as k,r as D,F as $,M as F,J as K}from"../chunks/index.dec1645f.js";import{B as G}from"../chunks/config.356a930e.js";import{g as w}from"../chunks/navigation.ed32ecc9.js";import{S as J,r as Q}from"../chunks/SyntaxHighlight.2ba6a564.js";import{g as A,i as R}from"../chunks/auth.59faee21.js";async function W({params:i}){return{slug:i.slug}}const st=Object.freeze(Object.defineProperty({__proto__:null,load:W},Symbol.toStringTag,{value:"Module"}));function B(i){let s,l,n,u,o,c,r,d;return{c(){s=_("div"),l=_("button"),n=k("edit"),u=v(),o=_("button"),c=k("delete"),this.h()},l(e){s=g(e,"DIV",{class:!0});var t=b(s);l=g(t,"BUTTON",{});var a=b(l);n=D(a,"edit"),a.forEach(f),u=y(t),o=g(t,"BUTTON",{});var m=b(o);c=D(m,"delete"),m.forEach(f),t.forEach(f),this.h()},h(){E(s,"class","admin-option")},m(e,t){p(e,s,t),h(s,l),h(l,n),h(s,u),h(s,o),h(o,c),r||(d=[$(l,"click",i[3]),$(o,"click",i[4])],r=!0)},p:F,d(e){e&&f(s),r=!1,K(d)}}}function X(i){let s,l,n,u,o,c,r,d;s=new J({});let e=i[2]&&B(i);return{c(){L(s.$$.fragment),l=v(),n=_("div"),u=new M(!1),o=v(),e&&e.c(),c=v(),r=_("div"),this.h()},l(t){N(s.$$.fragment,t),l=y(t),n=g(t,"DIV",{class:!0});var a=b(n);u=C(a,!1),o=y(a),e&&e.l(a),a.forEach(f),c=y(t),r=g(t,"DIV",{class:!0});var m=b(r);m.forEach(f),this.h()},h(){u.a=o,E(n,"class","post-header"),E(r,"class","post")},m(t,a){U(s,t,a),p(t,l,a),p(t,n,a),u.m(i[0],n),h(n,o),e&&e.m(n,null),p(t,c,a),p(t,r,a),r.innerHTML=i[1],d=!0},p(t,[a]){(!d||a&1)&&u.p(t[0]),t[2]?e?e.p(t,a):(e=B(t),e.c(),e.m(n,null)):e&&(e.d(1),e=null),(!d||a&2)&&(r.innerHTML=t[1])},i(t){d||(V(s.$$.fragment,t),d=!0)},o(t){q(s.$$.fragment,t),d=!1},d(t){z(s,t),t&&f(l),t&&f(n),e&&e.d(),t&&f(c),t&&f(r)}}}function Y(i,s,l){let{data:n}=s,u="",o="",c=!1;async function r(t){let a=A(),m=await fetch(`${G}/blog/${t}`,{method:"GET",headers:{Token:a??""}}).then(T=>T.json()),S=new Date(m.Date);var H={year:"numeric",month:"long",day:"numeric"};let I=S.toLocaleDateString("en-US",H);l(0,u=`
        <h1 class="title">${m.Title}</h1>
        <time class="date" datetime="${S.toISOString()}" itemprop="datePublished">${I}</time>
        <div class="tags">
          ${m.Tags.map(T=>`<span class="tag">#${T}</span>`).join("")}
        </div>`),l(1,o=m.Html),l(2,c=await R())}function d(){w("/new/?edit="+n.slug)}function e(){if(confirm("Are you sure you want to delete this post?")){let a=A();fetch("${BACKEND_API}/blog/"+n.slug,{method:"DELETE",headers:{Token:a??""}}).then(()=>{w("/blog")})}}return i.$$set=t=>{"data"in t&&l(5,n=t.data)},i.$$.update=()=>{i.$$.dirty&32&&(async()=>(await r(n.slug),Q()))()},[u,o,c,d,e,n]}class nt extends P{constructor(s){super(),O(this,s,Y,X,j,{data:5})}}export{nt as component,st as universal};
