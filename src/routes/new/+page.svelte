<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">
    <script src="//cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js"></script>
</svelte:head>

<script lang="ts">
    import SyntaxHighlight, { render_highlight } from 'src/components/SyntaxHighlight.svelte';
    import { onMount } from 'svelte';
    
    interface PostObject {
        id: string,
        url: string,
        title: string,
        tags: string[],
        date: Date,
        markdown: string,
        html: string
    }

    let timestamp: Date = new Date(Date.now());
    let dateString: string = `${timestamp.toISOString().split('T')[0]} ${timestamp.toString().split(" ")[4]} -${timestamp.toString().split("-")[1].slice(0,2)}:${timestamp.toString().split("-")[1].slice(2,5)}`;
    let yaml_template: string = `---\ntitle: \ntags: [ ]\ndate: ${dateString}\n---\n`;
    let textarea: HTMLTextAreaElement | null;
    let preview: HTMLDivElement | null;

    function render_preview() {
        const regex = /^---[\s\S]*?---\s*/m;
        const markdown = textarea!.value.replace(regex, '')
        
        const katex_options = {
            throwOnError: false
        };

        const marked_options = {
            mangle: false,
            headerIds: false
        }
        marked.use(markedKatex(katex_options), marked_options);
        let rendered: string = marked.parse(markdown);
        console.log(rendered);
        
        textarea!.style.display = 'none';
        preview!.innerHTML = rendered;
        render_highlight();
    }

    function edit() {
        textarea!.style.display = 'block';
        preview!.innerHTML = '';
    }

    function save() {
        try {
            let raw:string = textarea!.value;

            let header: string = raw.split("---")[1];
            let new_post = jsyaml.load(header) as PostObject;

            new_post.markdown = raw;

            const regex = /^---[\s\S]*?---\s*/m;
            const markdown = textarea!.value.replace(regex, '');
        
            const options = {
                throwOnError: false
            };
            marked.use(markedKatex(options));
            new_post.html = marked.parse(markdown);

            new_post.url = `${new_post.date.toISOString().split('T')[0]}-${new_post.title.replaceAll(" ", "-")}`;

            let tok : string|null = localStorage.getItem('token');
            const response = fetch("http://104.154.96.6:8080/blog/", {
                method: 'POST',
                body: JSON.stringify(new_post),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': tok != null ? tok : '',
                }
                
            });
        }
        catch(err) {
            window.alert(err.message);
        }
    }
    
    onMount(() => {
        textarea = document.querySelector('textarea');
        preview = document.querySelector('.preview');

        textarea!.addEventListener('keydown', event => {
            if (event.key === 'Tab') {
                const start = textarea!.selectionStart;
                const end = textarea!.selectionEnd;

                textarea!.value = textarea!.value.substring(0, start) + '\t' + textarea!.value.substring(end);
                textarea!.selectionStart = textarea!.selectionEnd = start + 1;

                event.preventDefault();
            }
        })
    })
</script>

<SyntaxHighlight/>
<h1>editor</h1>
<div class="markdown-editor">
    <div class="markdown-header">
        <button on:click={edit}>edit</button>
        <button on:click={render_preview}>preview</button>
    </div>
    <div class="markdown-body">
        <div class='preview'></div>
        <textarea>{yaml_template}</textarea>
    </div>
    <div class="markdown-footer">
        <button onclick="location.href='/'">cancel</button>
        <button on:click={save}>save</button>
    </div>
</div>

<style lang="scss">
    h1 {
        margin-bottom: 0;
    }
    .markdown-editor {   
        .markdown-body {
            width: 100%;
            min-height: 70vh;
            padding: 0;
            border: 1;
            textarea {
                tab-size: 4;
                width: 100%;
                min-height: 70vh;
                font-size: 0.7em;
                line-height: 21px;
                font-family: monospace;
                resize: none;
                outline: none;
                background-color: var(--background-color);
                color: var(--primary-color);
            }
        }     
    }
</style>