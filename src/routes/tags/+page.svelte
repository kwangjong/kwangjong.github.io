<script lang="ts">
    import 'src/stylesheets/blog-common.scss';
    import 'src/stylesheets/tag-list.scss';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { getToken } from 'src/components/auth';
    import { BACKEND_API } from '$lib/config';

    let tagList: string[] = [];

    async function fetchTagList() {
        const token = getToken();

        try {
            tagList = await fetch(
                `${BACKEND_API}/tags/list/all`, {
                    method: 'GET',
                    headers: { 'Token': token || '' }
                }
            ).then(res => res.json());
        } catch (error) {
            console.error("Error fetching tag list:", error);
        }
    }

    $: (async () => {
        const url = new URL($page.url);
        await fetchTagList();
    })();
</script>

<div class="blog-menu">
    <button class="blog" on:click={() => goto("/blog")}>Blog</button>
    <button class="tags">Tags</button>
</div>

<ul class="tag-list">
    {#each tagList as tag}
        <li class="tag-entry">
            <button class="tag" on:click={() => goto(`/blog?tag=${tag}`)}>{tag}</button>
        </li>
    {/each}
</ul>
