<script lang="ts">
	import 'src/stylesheets/blog-common.scss';
	import 'src/stylesheets/blog-list.scss';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import {
		formatPostDate,
		getPostsPage,
		hasNextPage,
		postUrl
	} from 'src/lib/posts';

	let numPage = 1;
	let tag = "";

	$: {
		if (browser) {
			numPage = Math.max(1, Number.parseInt($page.url.searchParams.get('page') ?? "1") || 1);
			tag = $page.url.searchParams.get('tag') ?? "";
		} else {
			numPage = 1;
			tag = "";
		}
	}
	$: blogEntries = getPostsPage(tag, numPage).map((entry) => ({
		url: postUrl(entry.slug),
		title: entry.title,
		date: entry.date,
		dateLabel: formatPostDate(entry.date)
	}));
	$: hasNext = hasNextPage(tag, numPage);

	function pageUrl(pageNumber: number): string {
		const params = new URLSearchParams();

		if (tag) params.set('tag', tag);
		if (pageNumber > 1) params.set('page', String(pageNumber));

		const query = params.toString();
		return `/blog${query ? `?${query}` : ''}`;
	}
</script>

<div class="blog-menu">
    <a class="blog" href="/blog">Blog</a>
    <a class="tags" href="/tags">Tags</a>
</div>

{#if tag!=""}
<div class="tags">
    <span class="tag">{tag}</span>
</div>
{/if}

<ul class="blog-list">
    {#each blogEntries as entry}
        <li class="blog-entry">
            <a class="title" href={entry.url}>{entry.title}</a><br>
            <time class="date" datetime={entry.date} itemprop="datePublished">{entry.dateLabel}</time>
        </li>
    {/each}
</ul>

<div class="post-navigator">
    {#if numPage > 1}
        <a href={pageUrl(numPage - 1)}>&lt; Newer</a>
    {/if}
    {#if hasNext}
        <a href={pageUrl(numPage + 1)}>Older &gt;</a>
    {/if}
</div>
