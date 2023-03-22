<svelte:head>
    {#if is_dark_value}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-dark.min.css">
    {:else}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-light.min.css">
    {/if}
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
</svelte:head>

<script lang="ts">
    import './post.scss';
    import { onMount } from 'svelte';
    import { _isDark } from '../../+layout';
    export let data: {content: string}

    let is_dark_value: boolean;
    
    _isDark.subscribe(value => {
		    is_dark_value = value;
	});

    onMount(async () => {
        hljs.highlightAll();
    })
</script>

<div class="post">
{@html data.content }
</div>