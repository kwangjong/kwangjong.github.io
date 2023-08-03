async function r({fetch:a,params:n}){let t=await a(`http://104.154.96.6:8080/blog/${n.slug}`).then(i=>i.json()),e=new Date(t.Date);var o={year:"numeric",month:"long",day:"numeric"};let l=e.toLocaleDateString("en-US",o);return{content:`
        <h1 class="title">${t.Title}</h1>
        <time class="date" datetime="${e}" itemprop="datePublished">${l}</time>
        ${t.Html}
        `}}const c=Object.freeze(Object.defineProperty({__proto__:null,load:r},Symbol.toStringTag,{value:"Module"}));export{c as _,r as l};
