<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">
    <script src="//cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/marked-katex-extension/lib/index.umd.js"></script>
</svelte:head>

<script lang="ts">
    import SyntaxHighlight, { render_highlight } from 'src/components/SyntaxHighlight.svelte';
    import { onMount } from 'svelte';
    import { authGuard } from 'src/components/auth';
    import { getToken } from 'src/components/auth';
    import { goto } from '$app/navigation';
    import type { PostObject } from'src/components/post';


    let timestamp: Date = new Date(Date.now());
    console.log(timestamp.toString().split("GMT")[1].slice(3,5))
    let dateString: string = `${timestamp.toISOString().split('T')[0]} ${timestamp.toString().split(" ")[4]} ${timestamp.toString().split("GMT")[1].slice(0,3)}:${timestamp.toString().split("GMT")[1].slice(3,5)}`;
    let yaml_template: string = `---\ntitle: \ntags: [ ]\ndate: ${dateString}\nvisibility: public #private unlisted\n---\n`;
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

    function cancel() {
        goto("/blog")
    }

    function save() {
        try {
            let raw:string = textarea!.value;

            let header: string = raw.split("---")[1];
            let new_post_header = jsyaml.load(header);
            const visibility_list = ['public', 'private', 'unlisted']

            if (!visibility_list.includes(new_post_header.visibility)) {
                throw new Error("visibillty should be either 'public', 'private', or 'unlisted'")
            } 

            let new_post : PostObject = {
                Id: content == null ? null : content.Id,
                Title: new_post_header.title,
                Date: new_post_header.date,
                MarkDown: raw,
                Tags: new_post_header.tags,
                Html: "",
                Url: "",
                Visibility: new_post_header.visibility
            }

            const regex = /^---[\s\S]*?---\s*/m;
            const markdown = textarea!.value.replace(regex, '');
        
            const options = {
                throwOnError: false
            };
            marked.use(markedKatex(options));
            new_post.Html = marked.parse(markdown);

            new_post.Url = `${new_post_header.date.toISOString().split('T')[0]}-${new_post_header.title.replaceAll(" ", "-")}`;

            let tok : string|null = getToken();
            const response = fetch("https://107106.xyz/blog/", {
                method: content == null ? 'POST' : 'PUT',
                body: JSON.stringify(new_post),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': tok != null ? tok : '',
                }
                
            }).then(()=> {
                goto("/blog");
            })
        }
        catch(err) {
            window.alert(err.message);
        }
    }


    let content: PostObject | null = null;

    async function fetchPostData() {
        const url = new URL(window.location.href); // Get the URL on client-side
        const edit_url: string | null = url.searchParams.get('edit');

        if (edit_url != null) {
        content = await fetch(`https://107106.xyz/blog/${edit_url}`)
            .then((response: Response) => response.json());
        }
    }
    
    onMount(async () => {
        if (!(await isAuthed())) {
            window.location.href = '/admin';
        }

        await fetchPostData();

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
        
        if (content!= null) {
            textarea!.value = content!.MarkDown;
        }
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
        <button on:click={cancel}>cancel</button>
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
