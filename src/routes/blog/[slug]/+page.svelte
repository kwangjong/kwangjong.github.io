<script lang="ts">
    import 'src/stylesheets/post.scss';
    import { onMount } from 'svelte';

    import { goto } from '$app/navigation';
    import SyntaxHighlight, { render_highlight } from 'src/components/SyntaxHighlight.svelte';
    
    import { getToken } from 'src/components/auth';
    import { isAuthed } from 'src/components/auth';
    import type { PostObject } from 'src/components/post';

    export let data: {slug: string}

    let header: string = '';
    let body: string = '';
    let isAuthedFlag: boolean = false;
    
    async function fetchPostData(slug: string) {
        let tok: string | null = getToken();

        let post: PostObject = await fetch(`https://107106.xyz/blog/${slug}`, {
        method: 'GET',
        headers: {
            'Token': tok != null ? tok : '',
        }
        }).then((response: Response) => response.json());

        let date = new Date(post.Date);
        var options: any = { year: 'numeric', month: 'long', day: 'numeric' };
        let dateString: string = date.toLocaleDateString("en-US", options);

        header = `
        <h1 class="title">${post.Title}</h1>
        <time class="date" datetime="${date.toISOString()}" itemprop="datePublished">${dateString}</time>`;
        body = post.Html;
        isAuthedFlag = await isAuthed();
    }

    onMount(async () => {
        await fetchPostData(data.slug);
        render_highlight();
    })

    function edit_post() {
        goto("/new/?edit="+data.slug)
    }

    function delete_post() {
        let result = confirm('Are you sure you want to delete this post?')
        if (result) {
            let tok : string|null = getToken();
            const response = fetch("https://107106.xyz/blog/"+data.slug, {
                method: 'DELETE',
                headers: {
                    'Token': tok != null ? tok : '',
                }
                
            }).then(()=> {
                goto("/blog");
            })
        }
    }
</script>

<SyntaxHighlight/>
<div class="post">
{@html header }
{#if isAuthedFlag}
<div class="admin-option">
    <button on:click={edit_post}>edit</button>
    <button on:click={delete_post}>delete</button>
</div>
{/if}
{@html body }
</div>