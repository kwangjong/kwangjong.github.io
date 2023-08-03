async function i({url:s}){const a=parseInt(s.searchParams.get("page")??"1");let l=await fetch(`http://104.154.96.6:8080/blog/list?skip=${(a-1)*6}&numPost=6`).then(t=>t.json()),e='<ul class="blog-list">';return l.entries.forEach(t=>{let o=new Date(t.Date);var n={year:"numeric",month:"long",day:"numeric"};let r=o.toLocaleDateString("en-US",n);e+=`
        <li class="blog-entry">
            <h2 class="title"><a href="${"/blog/"+t.Url}">${t.Title}</a></h2>
            <time class="date" datetime="${o}" itemprop="datePublished">${r}</time>
        </li>
        `}),e+='</ul> <section id="post-navigator">',e+=a>1?`<a href="/blog?page=${a-1}"> &lt Newer </a>`:"",e+=l.hasNext?`<a href="/blog?page=${a+1}"> Older &gt </a>`:"",e+="</section>",{content:e}}const c=Object.freeze(Object.defineProperty({__proto__:null,load:i},Symbol.toStringTag,{value:"Module"}));export{c as _,i as l};
