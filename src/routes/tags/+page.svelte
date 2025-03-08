<script lang="ts">
    import { goto } from "$app/navigation"
</script>

<div class=blog-menu>
<button class=blog on:click={()=>goto("/blog")}>Blog</button> <button class=tags>Tags</button>
</div>