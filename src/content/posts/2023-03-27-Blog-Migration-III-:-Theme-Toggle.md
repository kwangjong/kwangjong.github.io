---
title: "Blog Migration III : Theme Toggle"
tags: [frontend, blog-migration]
date: 2023-03-27 14:52:00 -05:00
visibility: public
---

I wanted to add a button to toggle between dark and light modes on my new blog. Here's how I implemented it.

![gif-demo](https://i.imgur.com/KynULYE.gif)

[repo](https://github.com/kwangjong/new-kwangjong.github.io/)

## Styles

The toggle button will change the body class. By defining CSS variables for different colors in the body classes, child components can use these variables for their colors.

[`src/global.css`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/global.scss)
```css
body {
	...
	background-color: var(--background-color);
	color: var(--primary-color);
}
body.light {
	--background-color: #ffffff;
	--primary-color: #1d1e20;
	--secondary-color: #606164;
	--highlight-color: #1a81ff;

}

body.dark {
	--background-color: #1d1e20;
	--primary-color: #e5e5e5;
	--secondary-color: #aeaeae;
	--highlight-color: #1a81ff;
}
```

## Basics

First, I declared a boolean variable that indicates which theme the browser prefers. The body will switch classes when the variable is updated.

[`src/routes/+layout.svelte:6`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L6)
```typescript
let is_dark: boolean = false;
```

[`src/routes/+layout.svelte:29`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L29)
```html
<body class:dark={is_dark} class:light={!is_dark}
...
</body>
```

The `toggleTheme()` function will update is_dark when called.

[`src/routes/+layout.svelte:7`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L7)
```typescript
function toggleTheme(match: boolean) {
	is_dark = match;
}
```

And `toggleTheme()` will flip the value of `is_dark` when the toggle button is clicked, 

[`src/routes/+layout.svelte:35`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L35)
```html
<button on:click={() => toggleTheme(!is_dark)}>
	{#if is_dark}
		<!-- sun icon -->
	{:else}
		<!-- moon icon -->
	{/if}
</button>
```

Lastly, I queried the `prefers-color-scheme: dark`, ran the `toggle_theme()` function, and added an event listener to the media query so that the theme changes automatically whenever the user changes their preference.

[`src/routes/+layout.svelte:21`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L21)
```typescript
import { onMount } from 'svelte';
...
onMount(async () => {
	toggleTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
	window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', event => {
		toggleTheme(event.matches);
	});
})
```

## Spin Animation

For a fun little user experience, I added a spin animation following [Pyronaur's blog post](https://pyronaur.com/dark-mode/).

[`/src/global.scss:55`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/global.scss#L55)
```css
@mixin spin-animation {
	%spin {
		animation: spin 575ms cubic-bezier(0.075, 0.82, 0.17, 1.135);
	}
        
	.spin-right {
		@extend %spin;
		@keyframes spin {
			0% {
				transform: scale(0) rotate(0deg);
			}
			100% {
				transform: scale(1) rotate(720deg);
			}
		}
	}
	.spin-left {
		@extend %spin;
		@keyframes spin {
			0% {
				transform: scale(0) rotate(0deg);
			}
			100% {
				transform: scale(1) rotate(-720deg);
			}
		}
	}
}
...
button {
  ...
  @include spin-animation;
}
```

[`src/routes/+layout.svelte:13`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L13)
```css
let spinDirection: "left" | "right" = "right";
let spin = false;
function trigger_spin(duration: number) {
	spin = true;
	setTimeout(() => (spin = false), duration);
}
```

[`src/routes/+layout.svelte:36`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L36)
```html
<button on:click={() => toggle_theme(!is_dark)}>
	<div class:spin-left={spin && spinDirection === "left"}
		class:spin-right={spin && spinDirection === "right"}>
	{#if is_dark}
		<!-- sun icon -->
	{:else}
		<!-- moon icon -->
	{/if}
	</div>
</button>

```

`triggerSpin()` is called inside the `toggleTheme()`.

[`src/routes/+layout.svelte:10`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L10)
```typescript
function toggleTheme(match: boolean) {
	is_dark = match;
	triggerSpin(650);
}
```

## Exporting `is_dark` to [Writeable stores](https://svelte.dev/tutorial/writable-stores)

I needed to export `is_dark` to other component files for syntax highlighting. I used stored the `is_dark` value to writable stores and updated it when the value changed.

[`src/routes/+layout.ts`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.ts)
```typescript
import { writable } from 'svelte/store';
export const _isDark = writable(false);
```

[`src/routes/+layout.svelte:9`](https://github.com/kwangjong/new-kwangjong.github.io/blob/5c5f2cb1e6a497eb62334dfb728e1eda1c52f002/src/routes/%2Blayout.svelte#L9)
```typescript
import { _isDark } from './+layout';
...
function toggleTheme(match: boolean) {
	is_dark = match
	_isDark.update(() => match);
	triggerSpin(650);
}
```


## References

* [Dark Mode Toggle - @pyronaur](https://pyronaur.com/dark-mode/)
