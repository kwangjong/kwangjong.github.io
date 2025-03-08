<script lang="ts">
    import 'src/stylesheets/blog-list.scss';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { ListEntry } from 'src/components/post';
    import { getToken } from 'src/components/auth';
    import { BACKEND_API } from '$lib/config';

    let blogEntries: { url: string; title: string; date: string }[] = [];
    let hasNext: boolean = false;
    let numPage: number = 1;
    let tag: string = "";

    async function fetchBlogData(pageNum: number, tag: string) {
        const maxPerPage = 6;
        const token = getToken();

        try {
            const response = await fetch(
                `${BACKEND_API}/blog/list?tag=${tag}&skip=${(pageNum - 1) * maxPerPage}&numPost=${maxPerPage}`, {
                    method: 'GET',
                    headers: { 'Token': token || '' }
                }
            ).then(res => res.json());

            blogEntries = response.entries.map((entry: ListEntry) => {
                const date = new Date(entry.Date);
                const dateString = date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

                return {
                    url: `/blog/${entry.Url}`,
                    title: entry.Title,
                    date: dateString
                };
            });

            hasNext = response.hasNext;
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    }

    $: (async () => {
        const url = new URL($page.url);
        numPage = parseInt(url.searchParams.get('page') ?? "1");
        tag = url.searchParams.get('tag') ?? "";
        await fetchBlogData(numPage, tag);
    })();
</script>

<div class="blog-menu">
    <button class="blog" on:click={() => goto("/blog")}>Blog</button>
    <button class="tags" on:click={() => goto("/tags")}>Tags</button>
</div>

<ul class="blog-list">
    {#each blogEntries as entry}
        <li class="blog-entry">
            <button class="title" on:click={() => goto(entry.url)}>{entry.title}</button><br>
            <time class="date" datetime={new Date(entry.date).toISOString()} itemprop="datePublished">{entry.date}</time>
        </li>
    {/each}
</ul>

<div class="post-navigator">
    {#if numPage > 1}
        <button on:click={() => goto(`/blog?page=${numPage - 1}`)}>&lt; Newer</button>
    {/if}
    {#if hasNext}
        <button on:click={() => goto(`/blog?page=${numPage + 1}`)}>Older &gt;</button>
    {/if}
</div>