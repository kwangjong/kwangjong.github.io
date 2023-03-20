<script lang="ts">
	import '../global.css'
    import Header from '../components/Header.svelte'
</script>

<Header/>
<main>
	<slot></slot>
</main>

<style>
	main {
		text-align: left;
		padding: 1em;
		max-width: var(--max-width);
		margin: auto;
	}
</style>