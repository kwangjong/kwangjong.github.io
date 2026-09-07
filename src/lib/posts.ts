import type { StaticPost, StaticPostDetail } from 'src/components/post';
import { postHtmlBySlug } from 'src/lib/generated/postHtml';
import { posts, tags } from 'src/lib/generated/postIndex';

export const MAX_PER_PAGE = 7;

export const postSummaries: StaticPost[] = posts;
export const tagList: string[] = tags;

export function getPost(slug: string): StaticPostDetail | null {
	const post = postSummaries.find((entry) => entry.slug === slug);

	if (!post) {
		return null;
	}

	return {
		...post,
		html: postHtmlBySlug[slug] ?? ''
	};
}

export function getPostEntries(): { slug: string }[] {
	return postSummaries.map((post) => ({ slug: encodePostSlug(post.slug) }));
}

export function getPostsByTag(tag: string): StaticPost[] {
	if (!tag) {
		return postSummaries;
	}

	return postSummaries.filter((post) => post.tags.includes(tag));
}

export function getPostsPage(tag: string, page: number): StaticPost[] {
	const start = (page - 1) * MAX_PER_PAGE;

	return getPostsByTag(tag).slice(start, start + MAX_PER_PAGE);
}

export function hasNextPage(tag: string, page: number): boolean {
	return page * MAX_PER_PAGE < getPostsByTag(tag).length;
}

export function formatPostDate(date: string): string {
	return new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function decodePostSlug(slug: string): string {
	try {
		return decodeURIComponent(slug);
	} catch {
		return slug;
	}
}

export function encodePostSlug(slug: string): string {
	return slug.replace(/\?/g, '%3F').replace(/#/g, '%23');
}

export function postUrl(slug: string): string {
	return `/blog/${encodePostSlug(slug)}`;
}
