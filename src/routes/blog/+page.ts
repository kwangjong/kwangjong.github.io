interface ListEntry {
    Id: string,
    Url: string,
    Title: string,
    Date: Date,
    Tags: string[]
}

export async function load({ url }) {
    const maxPerPage: number = 6;
    const numPage: number = parseInt(url.searchParams.get('page') ?? "1");
    let response: {entries: ListEntry[], hasNext: boolean} = await fetch(`http://34.122.51.158:8080/blog/list?skip=${(numPage-1)*maxPerPage}&numPost=${maxPerPage}`)
         .then((response) => response.json());
    
    let content: string = "<ul class=\"blog-list\">";
    response.entries.forEach((entry) => {
        let date = new Date(entry.Date)
        var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        let dateString: string = date.toLocaleDateString("en-US", options);
        content += `
        <li class="blog-entry">
            <h2 class="title"><a href="${"/blog/"+entry.Url}">${entry.Title}</a></h2>
            <time class="date" datetime="${date}" itemprop="datePublished">${dateString}</time>
        </li>
        `
    });
    content += "</ul> <section id=\"post-navigator\">";
    content += numPage > 1 ? `<a href=\"/blog?page=${numPage-1}\"> &lt Newer </a>` : ""
    content += response.hasNext ? `<a href=\"/blog?page=${numPage+1}\"> Older &gt </a>` : ""
    content += "</section>"

    return { content } ;
  }