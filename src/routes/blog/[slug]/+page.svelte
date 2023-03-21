<script lang="ts">
    //export let data: {slug: string};
    import './post.scss';
    export let data: {content: string}
</script>

{@html data.content }