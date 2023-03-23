// import { marked } from "marked";
// import yaml from "js-yaml";

interface Info {
        layout: string,
        title: string,
        tags: string[],
        date: Date,
}

export async function load({ fetch }) {
    // let markdown: string = await fetch("https://raw.githubusercontent.com/kwangjong/kwangjong.github.io/main/_posts/blog/2023/02/2023-02-15-Go-Multi-threading.md")
    //     .then((response: Response) => response.blob())
    //     .then((blob: Blob) => blob.text())
    //     .then((markdown: string) => {
    //         return markdown;
    //     });
    
    // let header: string = markdown.split("---")[1];
    
    // let parsed_markdown: string = marked.parse(markdown.split("---")[2]);

    // let info = yaml.load(header) as Info;

    var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    let date = new Date(Date.now())
    let dateString: string = date.toLocaleDateString("en-US", options);
    
    let content: string = `
        <h1 class="title">Hello World</h1>
        <time class="date" datetime="${date}" itemprop="datePublished">${dateString}</time>
        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <pre><code class="language-python">def hello():\n    print("hello world")\n\nhello()
</code></pre>
        `;



    return { content } ;
  }