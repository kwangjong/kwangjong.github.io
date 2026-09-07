---
title: "Blog Migration II : Getting Started with Sveltekit"
tags: [svelt, frontend, blog-migration]
date: 2023-03-23 18:47:00 -05:00
---

While learning more about the frontend world, I came across a framework called [Svelte](https://kit.svelte.dev), that I found this framework to be good fit for my blog app. I decided to use Svelte instead of Vue.

## Why Svelte?

![loved-vs-dreaded](https://i.imgur.com/neVxOok.png)

Firstly, performance. Svelte compiles your code at build time and produces highly optimized vanilla javascript code. It is said to be 30% faster than other popular frameworks that uses virtual DOM like React or Vue.

Secondly, Svelte has gentle learning curve to other frameworks. Its syntax is simple and intuitive, and it comes with integrted build system called Svelte Compiler. I prefer languages and framworks that are straightforward and intuitive, as they naturally promote good coding practices and uniform styles, especially for large-scale projects involving multiple developers.

Lastly, Svelte is gaining popularity in the developer community. It was ranked second for the most love web frameworks by developers in 2022. Furthermore, with the release of SvelteKit at the end of last year, the Svelte community is rapidly expanding.

## Getting Started with SvelteKit

[repo](https://github.com/kwangjong/new-kwangjong.github.io)

You can install and launch SvelteKit with the following commands.

```
$ npm create svelte@latest my-app
$ cd my-app
$ npm install
$ npm run dev -- --open
```

## Dependencies

I used few modules for styling and parsing my blog posts written with markdown. Here is list of dependencies I added so far.
* [**sass**](https://blog.hao.dev/how-to-add-scss-or-sass-to-sveltekit): superset of css
* [**marked**](https://marked.js.org): markdown parser
* [**highlight.js**](https://highlightjs.org): syntax highlighter for code blocks
* [**js-yaml**](https://highlightjs.org): yaml parser

## Designing Pages

### Page layout
In SvelteKit, You can create a layout for all app pages in [`src/routes/+layout.svelte`](https://github.com/kwangjong/new-kwangjong.github.io/blob/main/src/routes/%2Blayout.svelte). 
You can specify where your child page components sit using the `<slot>` tag.

```html
<main>
	<slot></slot>
</main>
```

I designed a navigation bar that sits at the top of all pages in the layout file.

![nav-bar](https://i.imgur.com/oOtsrsx.png)

### Routing Pages

SvelteKit uses [*filesystem-based router*](https://kit.svelte.dev/docs/routing). Each directory in the codebase will correspond to url paths that the user can access. Each directory will contain a page component file,`+page.svelte`, and optional scripts, `+page.js` or +page.ts`.

```
src
├── blog
│   ├── [slug]
│   │   ├── +page.svelte
│   │   └── +page.ts
│   ├── +page.svelte
│   └── +page.ts
├── +page.svelte
└── +page.ts
```
* `src/+page.svelte` will be my blog's root routes or home page.
* `src/blog/+page.svelte` will be the blog page that lists blog posts.
* `src/blog/[slug]/+page.svelte` will load individual posts with a slug corresponding to each blog post

#### [`/blog`](https://github.com/kwangjong/new-kwangjong.github.io/blob/main/src/routes/blog/%2Bpage.svelte)

![blog](https://i.imgur.com/hxMVxPZ.png)

#### [`/blog/example`](https://github.com/kwangjong/new-kwangjong.github.io/blob/main/src/routes/blog/%5Bslug%5D/%2Bpage.svelte)

![blog/example](https://i.imgur.com/qBO261R.png)

## Links
* [Svelte in 100 Seconds](https://www.youtube.com/watch?v=rv3Yq-B8qp4&t=38s)
* [SvelteKit is my mistress](https://www.youtube.com/watch?v=uEJ-Rnm2yOE)

