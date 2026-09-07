<svelte:head>
    <link class="highlightjs-css" rel="stylesheet" href={highlightTheme}>
</svelte:head>

<script lang='ts' context="module">
    import { get } from 'svelte/store';
    import { _isDark as isDarkStore } from 'src/routes/+layout';

    const dark_theme: string = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/stackoverflow-dark.min.css';
    const light_theme: string = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/stackoverflow-light.min.css';

    interface HighlightJs {
        highlightElement: (element: Element) => void;
    }

    declare global {
        interface Window {
            hljs?: HighlightJs;
        }
    }
    
    export function render_highlight() {
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            return;
        }

        const stylesheet = document.querySelector(".highlightjs-css");
        stylesheet?.setAttribute('href', get(isDarkStore) ? dark_theme : light_theme);

        function highlightBlocks(hljs: HighlightJs) {
            document.querySelectorAll('code').forEach((block) => {
                if (block.classList.length == 0) {
                    block.classList.add('language-plaintext');
                }
                hljs.highlightElement(block);
            });
        }

        function loadHighlightJS(): Promise<HighlightJs> {
            return new Promise((resolve, reject) => {
                if (window.hljs) {
                    resolve(window.hljs);
                } else {
                    const script = document.createElement('script');
                    script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/highlight.min.js";
                    script.onload = () => {
                        if (window.hljs) {
                            resolve(window.hljs);
                        } else {
                            reject(new Error("Highlight.js loaded without exposing window.hljs"));
                        }
                    };
                    script.onerror = reject;
                    document.head.appendChild(script);
                }
            });
        }

        loadHighlightJS().then(highlightBlocks).catch((error) => {
            console.error("Failed to load Highlight.js:", error);
        });
    };
</script>

<script lang="ts">
    import { _isDark } from 'src/routes/+layout';

    $: highlightTheme = $_isDark ? dark_theme : light_theme;
</script>
