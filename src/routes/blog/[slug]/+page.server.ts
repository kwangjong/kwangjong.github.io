/** @type {import('./$types').EntryGenerator} */

import { BACKEND_API } from 'src/lib/config';

export async function entries() {

    let urls: {slug: string}[] = await fetch(`${BACKEND_API}/blog/list/all`)
         .then((response) => response.json())
         .then((response: string[]) => response.map(item => ({ slug: item })))

    return urls;
}

export const prerender = true;