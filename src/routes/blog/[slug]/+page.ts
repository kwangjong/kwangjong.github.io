// export const load = ({ params }) => {
//     return {
//         slug: params.slug
//     }
// }
import { marked } from "marked";
import yaml from "js-yaml";

interface Info {
        layout: string,
        title: string,
        tags: string[],
        date: Date,
}

export async function load({ fetch }) {
    let markdown: string = await fetch("https://raw.githubusercontent.com/kwangjong/kwangjong.github.io/main/_posts/blog/2023/03/2023-03-08-Silly-Design-I.md")
        .then((response: Response) => response.blob())
        .then((blob: Blob) => blob.text())
        .then((markdown: string) => {
            return markdown;
        });

    let header: string = "title: \"Silly Design I: Inheritance vs Composition in Go\"\ntags: [go, silly-design, oop]\ndate: 2023-03-08 23:55:00 -5:00\n" 
    let parsed_markdown: string = marked.parse(markdown.split("---")[2]);

    let info = yaml.load(header) as Info;
    
    let dateString: string = (new Date(info.date)).toDateString().slice(4, 20)
    
    let content: string = `<div class="post">
        <h1 class="title">${info.title}</h1>
        <time class="datePublished" datetime="${info.date}" itemprop="datePublished">${dateString}</time>
        ${parsed_markdown}
        </div>`

    return { content } ;
  }