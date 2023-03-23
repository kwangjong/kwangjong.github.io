<script lang="ts">
    import './post.scss';
    import { onMount } from 'svelte';
    import SyntaxHighlight, { render_highlight } from 'src/components/SyntaxHighlight.svelte';
    export let data: {content: string}

    onMount(async () => {
        render_highlight();
    })
</script>

<SyntaxHighlight/>
<div class="post">
{@html data.content }
</div>