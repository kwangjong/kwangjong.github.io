import { writable } from 'svelte/store';
export const _isDark = writable(false);
export const ssr = false;
export const prerender = true