<script lang="ts">
	import 'src/stylesheets/global.scss';
	import { onMount } from 'svelte';
	import { _isDark } from './+layout';

    let is_dark: boolean;
    function toggleTheme(match: boolean) {
        is_dark = match
		_isDark.update(() => match);
        triggerSpin(650);
    }

    let spinDirection: "left" | "right" = "right";
    let spin = false;
    function triggerSpin(duration: number) {
        spin = true;
        setTimeout(() => (spin = false), duration);
    }

    onMount(async () => {
        toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', event => {
                toggleTheme(event.matches);
        });
    })
</script>

<div class="container"class:dark={is_dark} class:light={!is_dark}>
    <header>
        <a class="home" href="/">Home</a>
        <div class="menu">
            <a href="/blog">Blog</a>
            <!-- <a href="/tags">tags</a> -->
            <button on:click={() => toggleTheme(!is_dark)}>
                <div 
                    class:spin-left={spin && spinDirection === "left"}
                    class:spin-right={spin && spinDirection === "right"}>
                    {#if is_dark}
                        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1300_106215)">
                        <path d="M12 0C12.5523 0 13 0.447715 13 1V4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4V1C11 0.447715 11.4477 0 12 0Z" fill="currentColor"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" fill="currentColor"/>
                        <path d="M20.4852 4.92894C20.8757 4.53841 20.8757 3.90525 20.4852 3.51472C20.0947 3.1242 19.4615 3.1242 19.071 3.51472L16.9496 5.63605C16.5591 6.02657 16.5591 6.65974 16.9496 7.05026C17.3402 7.44078 17.9733 7.44078 18.3639 7.05026L20.4852 4.92894Z" fill="currentColor"/>
                        <path d="M24 12C24 12.5523 23.5523 13 23 13H20C19.4477 13 19 12.5523 19 12C19 11.4477 19.4477 11 20 11H23C23.5523 11 24 11.4477 24 12Z" fill="currentColor"/>
                        <path d="M19.0711 20.4853C19.4616 20.8758 20.0948 20.8758 20.4853 20.4853C20.8758 20.0948 20.8758 19.4616 20.4853 19.0711L18.364 16.9498C17.9734 16.5592 17.3403 16.5592 16.9497 16.9498C16.5592 17.3403 16.5592 17.9735 16.9497 18.364L19.0711 20.4853Z" fill="currentColor"/>
                        <path d="M12 24C11.4477 24 11 23.5523 11 23V20C11 19.4477 11.4477 19 12 19C12.5523 19 13 19.4477 13 20V23C13 23.5523 12.5523 24 12 24Z" fill="currentColor"/>
                        <path d="M3.51482 19.0711C3.12429 19.4616 3.12429 20.0948 3.51482 20.4853C3.90534 20.8758 4.53851 20.8758 4.92903 20.4853L7.05035 18.364C7.44087 17.9734 7.44087 17.3403 7.05035 16.9497C6.65983 16.5592 6.02666 16.5592 5.63614 16.9497L3.51482 19.0711Z" fill="currentColor"/>
                        <path d="M0 12C0 11.4477 0.447715 11 1 11H4C4.55228 11 5 11.4477 5 12C5 12.5523 4.55228 13 4 13H1C0.447715 13 0 12.5523 0 12Z" fill="currentColor"/>
                        <path d="M4.92894 3.5147C4.53841 3.12417 3.90525 3.12417 3.51472 3.5147C3.1242 3.90522 3.1242 4.53838 3.51472 4.92891L5.63605 7.05023C6.02657 7.44075 6.65974 7.44075 7.05026 7.05023C7.44078 6.6597 7.44078 6.02654 7.05026 5.63601L4.92894 3.5147Z" fill="currentColor"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_1300_106215">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                    {:else}
                        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0972 2.53039C12.2913 2.8649 12.2752 3.28136 12.0557 3.5998C11.3898 4.56594 11 5.73595 11 7.00002C11 10.3137 13.6863 13 17 13C18.2641 13 19.4341 12.6102 20.4002 11.9443C20.7187 11.7249 21.1351 11.7087 21.4696 11.9028C21.8041 12.0969 21.9967 12.4665 21.9642 12.8519C21.5313 17.9765 17.236 22 12 22C6.47715 22 2 17.5229 2 12C2 6.76398 6.02351 2.46874 11.1481 2.03585C11.5335 2.0033 11.9031 2.19588 12.0972 2.53039ZM9.42424 4.42352C6.26994 5.49553 4 8.48306 4 12C4 16.4183 7.58172 20 12 20C15.517 20 18.5045 17.7301 19.5765 14.5758C18.7676 14.8508 17.9008 15 17 15C12.5817 15 9 11.4183 9 7.00002C9 6.09922 9.1492 5.2324 9.42424 4.42352Z" fill="currentColor"/>
                        </svg>
                    {/if}
                </div>
            </button>
        </div>
    </header>
    <main>
	    <slot></slot>
    </main>
</div>