import { isAuthed } from 'src/components/auth';
import type { PostObject } from 'src/components/post';
import { getToken } from 'src/components/auth';

export async function load({ fetch, params }) {
    let tok : string|null = getToken();

    let post: PostObject = await fetch(`https://107106.xyz/blog/${params.slug}`, {
            method: 'GET',
            headers: {
                'Token': tok != null ? tok : '',
            }
        }).then((response: Response) => response.json());

    let date = new Date(post.Date)
    var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    let dateString: string = date.toLocaleDateString("en-US", options);
    
    let header: string = `
        <h1 class="title">${post.Title}</h1>
        <time class="date" datetime="${date}" itemprop="datePublished">${dateString}</time>`;
    return { header: header, body: post.Html, isAuthed: await isAuthed(), slug: params.slug};
  }