import { error } from '@sveltejs/kit';
import { decodePostSlug, getPost, getPostEntries } from 'src/lib/posts';

export const prerender = true;

export function entries() {
	return getPostEntries();
}

export function load({ params }) {
	const post = getPost(decodePostSlug(params.slug));

	if (!post) {
		throw error(404, 'Post not found');
	}

	return { post };
}
