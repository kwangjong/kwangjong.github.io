<script lang="ts">
	import 'src/stylesheets/blog-common.scss';
	import 'src/stylesheets/tag-list.scss';
	import { tagList } from 'src/lib/posts';
</script>

<div class="blog-menu">
    <a class="blog" href="/blog/">Blog</a>
    <a class="tags" href="/tags">Tags</a>
</div>

<ul class="tag-list">
    {#each tagList as tag}
        <li class="tag-entry">
            <a class="tag" href={`/blog/?tag=${encodeURIComponent(tag)}`}>{tag}</a>
        </li>
    {/each}
</ul>
