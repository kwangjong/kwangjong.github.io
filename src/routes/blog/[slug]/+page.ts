import { marked } from "marked";
import yaml from "js-yaml";

interface Info {
        layout: string,
        title: string,
        tags: string[],
        date: Date,
}

export async function load({ fetch }) {
    let markdown: string = await fetch("https://raw.githubusercontent.com/kwangjong/kwangjong.github.io/main/_posts/blog/2023/02/2023-02-15-Go-Multi-threading.md")
        .then((response: Response) => response.blob())
        .then((blob: Blob) => blob.text())
        .then((markdown: string) => {
            return markdown;
        });
    
    let header: string = markdown.split("---")[1];
    
    let parsed_markdown: string = marked.parse(markdown.split("---")[2]);

    let info = yaml.load(header) as Info;

    var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString: string = (new Date(info.date)).toLocaleDateString("en-US", options);
    
    let content: string = `
        <h1 class="title">${info.title}</h1>
        <time class="date" datetime="${info.date}" itemprop="datePublished">${dateString}</time>
        ${parsed_markdown}
        `;

    return { content } ;
  }