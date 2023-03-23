<svelte:head>
    <link class="highlightjs-css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-dark.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
</svelte:head>

<script lang='ts' context="module">
    import { _isDark } from 'src/routes/+layout';

    const dark_theme: string = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-dark.min.css';
    const light_theme: string = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/stackoverflow-light.min.css';
    let stylesheet: Element | null;
    
    export function render_highlight() {
        _isDark.subscribe(value => {
		    if(value) {
                stylesheet = document.querySelector(".highlightjs-css");
                stylesheet!.setAttribute('href', dark_theme);
            } else {
                stylesheet = document.querySelector(".highlightjs-css");
                stylesheet!.setAttribute('href', light_theme);
            }
	    });

        document.querySelectorAll('code').forEach((block) => {
            if(block.classList.length==0) {
                hljs.configure({languages: ['plaintext']});
            }
            hljs.highlightBlock(block);
        });
    };
</script>