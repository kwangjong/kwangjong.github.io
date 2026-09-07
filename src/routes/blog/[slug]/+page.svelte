<script lang="ts">
	import 'src/stylesheets/blog-common.scss';
	import 'src/stylesheets/post.scss';
	import { onMount } from 'svelte';
	import SyntaxHighlight, { render_highlight } from 'src/components/SyntaxHighlight.svelte';
	import { formatPostDate } from 'src/lib/posts';
	import type { PageData } from './$types';

	export let data: PageData;

	$: post = data.post;

	onMount(() => {
		render_highlight();
	});
</script>

<svelte:head>
	<title>{post.title} | KJ's Blog</title>
	<meta name="description" content={post.title}>
</svelte:head>

<SyntaxHighlight/>
<div class="post-header">
    <h1 class="title">{post.title}</h1>
    <time class="date" datetime={post.date} itemprop="datePublished">{formatPostDate(post.date)}</time>
    <div class="tags">
        {#each post.tags as tag}
            <a class="tag" href={`/blog?tag=${encodeURIComponent(tag)}`}>#{tag}</a>
        {/each}
    </div>
</div>
<article class="post">
{@html post.html }
</article>
