import { authGuard } from 'src/components/auth';
import type { PostObject } from 'src/components/post';

export async function load({ fetch, params }) {
    await authGuard();
    let post: PostObject = await fetch(`https://107106.xyz/blog/${params.slug}`)
        .then((response: Response) => response.json());
    return {content : post}
}