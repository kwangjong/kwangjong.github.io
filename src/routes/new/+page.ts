import { authGuard } from 'src/components/auth';
import type { PostObject } from 'src/components/post';

export async function load({ fetch, url }) {
    await authGuard();

    const edit_url: string | null = url.searchParams.get('edit')

    if (edit_url != null) {
        let post: PostObject = await fetch(`https://107106.xyz/blog/${edit_url}`)
            .then((response: Response) => response.json());
        return {content : post}
    }

    return {content : null }
}