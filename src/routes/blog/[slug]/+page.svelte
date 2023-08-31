<script lang="ts">
    import 'src/stylesheets/post.scss';
    import { onMount } from 'svelte';

    import { goto } from '$app/navigation';
    import SyntaxHighlight, { render_highlight } from 'src/components/SyntaxHighlight.svelte';
    import { getToken } from 'src/components/auth';
    export let data: {header: string, body: string, isAuthed: boolean, slug: string}

    onMount(async () => {
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
{@html data.header }
{#if data.isAuthed}
<div class="admin-option">
    <button on:click={edit_post}>edit</button>
    <button on:click={delete_post}>delete</button>
</div>
{/if}
{@html data.body }
</div>