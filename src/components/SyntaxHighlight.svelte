<svelte:head>
    <link class="highlightjs-css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/stackoverflow-dark.min.css">
</svelte:head>

<script lang='ts' context="module">
    import { _isDark } from 'src/routes/+layout';
    import { onDestroy } from 'svelte';

    const dark_theme: string = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/stackoverflow-dark.min.css';
    const light_theme: string = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/stackoverflow-light.min.css';
    let stylesheet: Element | null;
    
    export function render_highlight() {
        const unsubscribe = _isDark.subscribe(value => {
		    if(value) {
                stylesheet = document.querySelector(".highlightjs-css");
                stylesheet!.setAttribute('href', dark_theme);
            } else {
                stylesheet = document.querySelector(".highlightjs-css");
                stylesheet!.setAttribute('href', light_theme);
            }
	    });

        function highlightBlocks() {
            document.querySelectorAll('code').forEach((block) => {
                if (block.classList.length == 0) {
                    hljs.configure({languages: ['plaintext']});
                }
                hljs.highlightElement(block);
            });
        }

        function loadHighlightJS() {
            return new Promise((resolve, reject) => {
                if (window.hljs) {
                    resolve(window.hljs);
                } else {
                    const script = document.createElement('script');
                    script.src = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js";
                    script.onload = () => resolve(window.hljs);
                    script.onerror = reject;
                    document.head.appendChild(script);
                }
            });
        }

        loadHighlightJS().then(highlightBlocks).catch((error) => {
            console.error("Failed to load Highlight.js:", error);
        });
        
        onDestroy(unsubscribe);
    };
</script>