/** @type {import('./$types').EntryGenerator} */

export async function entries() {

    let urls: {slug: string}[] = await fetch(`https://107106.xyz/blog/list/all`)
         .then((response) => response.json())
         .then((response: string[]) => response.map(item => ({ slug: item })))

    return urls;
}

export const prerender = true;