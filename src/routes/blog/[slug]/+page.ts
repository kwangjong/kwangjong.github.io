// import { marked } from "marked";
// import yaml from "js-yaml";

interface Post {
    Url: string,
    Title: string,
    Date: Date,
    Tags: string[],
    Markdown: string,
    Html: string,
}

export async function load({ fetch, params }) {
    let post: Post = await fetch(`http://localhost:8080/blog/${params.slug}`)
        .then((response: Response) => response.json());

    let date = new Date(post.Date)
    var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString: string = date.toLocaleDateString("en-US", options);
    
    let content: string = `
        <h1 class="title">${post.Title}</h1>
        <time class="date" datetime="${date}" itemprop="datePublished">${dateString}</time>
        ${post.Html}
        `;
    return { content } ;
  }