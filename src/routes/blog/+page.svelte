<script lang="ts">
    import 'src/stylesheets/blog-list.scss';
    import { goto } from '$app/navigation';
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
                <h2 class="title"><button on:click={() => goto('${"/blog/"+entry.Url}"')}">${entry.Title}</button></h2>
                <time class="date" datetime="${date}" itemprop="datePublished">${dateString}</time>
            </li>
            `
        });
        content += "</ul> <section id=\"post-navigator\">";
        content += pageNum > 1 ? `<button on:click={() => goto('/blog?page=${pageNum-1}')}> &lt Newer </button>` : ""
        content += response.hasNext ? `<button on:click={() => goto('/blog?page=${pageNum+1}')}> Older &gt </button>` : ""
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
<button class=blog on:click={() => goto("/blog")}>Blog</button> <button class=tags on:click={() => goto("/tags")}>Tags</button>
</div>
{@html content}