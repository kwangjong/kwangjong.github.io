import{S as g,i as f,s as d,k as u,q as _,a as b,O as P,e as h,l as x,m as y,r as $,h as c,c as v,P as S,b as m,E as w,L as p}from"../chunks/index.d92f3f85.js";async function O({url:r}){const l=parseInt(r.searchParams.get("page")??"1");let n=await fetch(`http://104.154.96.6:8080/blog/list?skip=${(l-1)*6}&numPost=6`).then(o=>o.json()),t='<ul class="blog-list">';return n.entries.forEach(o=>{let i=new Date(o.Date);var e={year:"numeric",month:"long",day:"numeric"};let s=i.toLocaleDateString("en-US",e);t+=`
        <li class="blog-entry">
            <h2 class="title"><a href="${"/blog/"+o.Url}">${o.Title}</a></h2>
            <time class="date" datetime="${i}" itemprop="datePublished">${s}</time>
        </li>
        `}),t+='</ul> <section id="post-navigator">',t+=l>1?`<a href="/blog?page=${l-1}"> &lt Newer </a>`:"",t+=n.hasNext?`<a href="/blog?page=${l+1}"> Older &gt </a>`:"",t+="</section>",{content:t}}const H=Object.freeze(Object.defineProperty({__proto__:null,load:O},Symbol.toStringTag,{value:"Module"}));function j(r){let a,l,n,t,o=r[0].content+"",i;return{c(){a=u("h1"),l=_("blog"),n=b(),t=new P(!1),i=h(),this.h()},l(e){a=x(e,"H1",{});var s=y(a);l=$(s,"blog"),s.forEach(c),n=v(e),t=S(e,!1),i=h(),this.h()},h(){t.a=i},m(e,s){m(e,a,s),w(a,l),m(e,n,s),t.m(o,e,s),m(e,i,s)},p(e,[s]){s&1&&o!==(o=e[0].content+"")&&t.p(o)},i:p,o:p,d(e){e&&c(a),e&&c(n),e&&c(i),e&&t.d()}}}function D(r,a,l){let{data:n}=a;return r.$$set=t=>{"data"in t&&l(0,n=t.data)},[n]}class L extends g{constructor(a){super(),f(this,a,D,j,d,{data:0})}}export{L as component,H as universal};
