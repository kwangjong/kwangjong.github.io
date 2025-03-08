<script lang="ts">
    import 'src/stylesheets/blog-list.scss';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import type { ListEntry } from 'src/components/post';
    import { getToken } from 'src/components/auth'
    import { BACKEND_API } from '$lib/config';
    //export let data: {content: string}

    async function fetchBlogData(pageNum : number, tag : string) {
        const maxPerPage: number = 7;
        let tok : string|null = getToken();

        let response: {entries: ListEntry[], hasNext: boolean} = await fetch(
            `${BACKEND_API}/blog/list?tag=${tag}&skip=${(pageNum-1)*maxPerPage}&numPost=${maxPerPage}`, {
                method: 'GET',
                headers: {
                    'Token': tok != null ? tok : '',
                }
            }).then((response) => response.json());
        
        let content: string = "<ul class=\"blog-list\">";
        response.entries.forEach((entry) => {
            let date = new Date(entry.Date)
            var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
            let dateString: string = date.toLocaleDateString("en-US", options);
            content += `
            <li class="blog-entry">
                <h2 class="title"><a href="${"/blog/"+entry.Url}" sveltekit:prefetch>${entry.Title}</a></h2>
                <time class="date" datetime="${date}" itemprop="datePublished">${dateString}</time>
            </li>
            `
        });
        content += "</ul> <section id=\"post-navigator\">";
        content += pageNum > 1 ? `<a href=\"/blog?page=${pageNum-1}\"> &lt Newer </a>` : ""
        content += response.hasNext ? `<a href=\"/blog?page=${pageNum+1}\"> Older &gt </a>` : ""
        content += "</section>"

        return content;
    }


    let content: string = '';

    $: (async () => {
        const url = new URL($page.url);
        const numPage: number = parseInt(url.searchParams.get('page') ?? "1");
        const tag: string = url.searchParams.get('tag') ?? "";
        content = await fetchBlogData(numPage, tag);
    })();

</script>

<div class=blog-menu>
<a class=blog href="/blog">Blog</a> <a class=tags href="/tags" sveltekit:prefetch>Tags</a>
</div>
{@html content}