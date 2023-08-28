<h1>admin</h1>
<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    var button_disable = true;
    let input_element : HTMLInputElement | null

    function update_btn(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            submit_action() 
        }
        button_disable = (input_element!.value.length == 0);
    }

    async function submit_action() {
        await fetch(`https://107106.xyz/auth`, {
            method: 'GET',
            headers: {
                'Api-Key': input_element!.value,
            }
        }).then(response => response.status == 401 ? null : response.text())
        .then(tok => {
            if (tok != null) {
                window.alert('you are authenticated');
                localStorage.setItem('token', tok);
                goto('/new');
            } else {
                window.alert('invalid key');
            }
        })
    }

    onMount(() => {
        input_element = document.querySelector('input');
    })
</script>

<table>
    <tr>
        <td><p>api_key:</p></td>
    </tr>
    <tr>
        <td><input type="password" name="api-key" on:keyup={update_btn}></td>
        <td><button disabled={button_disable} on:click={submit_action}>submit</button></td>
    </tr>
</table>

<style lang="scss">
    p {
        margin: 0;
    }
</style>