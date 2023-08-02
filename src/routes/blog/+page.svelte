<script lang="ts">
    import 'src/stylesheets/blog-list.scss';
    export let data: {content: string}
</script>

<h1>blog</h1>
{@html data.content}