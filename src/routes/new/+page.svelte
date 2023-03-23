<script lang="ts">
    import SyntaxHighlight, { render_highlight } from 'src/components/SyntaxHighlight.svelte';
    import { onMount } from 'svelte';
    import { marked } from 'marked';
    import yaml from "js-yaml";

    interface PostObject {
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
        let rendered: string = marked.parse(textarea!.value.split('---')[2]);
        textarea!.style.display = 'none';
        preview!.innerHTML = rendered;
        render_highlight();
    }

    function edit() {
        textarea!.style.display = 'block';
        preview!.innerHTML = '';
    }

    function save() {
        let raw:string = textarea!.value;

        let header: string = raw.split("---")[1];
        let new_post = yaml.load(header) as PostObject;

        new_post.markdown = raw;
        new_post.html = marked.parse(raw.split("---")[2]);

        console.log(new_post);
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
        <button onclick="location.href='/blog'">cancel</button>
        <button on:click={save}>save</button>
    </div>
</div>

<style lang="scss">
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
            }
        }     
    }
</style>