#!/usr/bin/env node
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(repoRoot, 'src', 'content', 'posts');
const generatedDir = join(repoRoot, 'src', 'lib', 'generated');
const frontmatterPattern = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

marked.use(markedKatex({ strict: 'ignore', throwOnError: false }));

function loadFrontmatter(source, filePath) {
	try {
		return asRecord(load(source));
	} catch (error) {
		const patched = source
			.split(/\r?\n/)
			.map((line) => {
				const match = line.match(/^title:\s*(.+)$/);
				if (!match) return line;

				const title = match[1].trim();
				return title.startsWith('"') || title.startsWith("'") ? line : `title: ${JSON.stringify(title)}`;
			})
			.join('\n');

		try {
			return asRecord(load(patched));
		} catch {
			throw new Error(`${filePath}: invalid frontmatter: ${error.message}`);
		}
	}
}

function asRecord(value) {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return {};
	}

	return value;
}

function splitFrontmatter(raw, filePath) {
	const match = raw.match(frontmatterPattern);

	if (!match) {
		return {
			metadata: {},
			body: raw
		};
	}

	return {
		metadata: loadFrontmatter(match[1], filePath),
		body: raw.slice(match[0].length)
	};
}

function titleFromSlug(slug) {
	return slug
		.replace(/^\d{4}-\d{2}-\d{2}-/, '')
		.replaceAll('-', ' ')
		.replaceAll(':', ': ');
}

function normalizeTags(tags) {
	if (Array.isArray(tags)) {
		return tags.map((tag) => String(tag).trim()).filter(Boolean);
	}

	if (typeof tags === 'string') {
		return tags
			.split(',')
			.map((tag) => tag.trim())
			.filter(Boolean);
	}

	return [];
}

function normalizeDate(value, slug, filePath) {
	const fallbackDate = slug.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
	const rawDate = value ?? fallbackDate;

	if (!rawDate) {
		throw new Error(`${filePath}: frontmatter date is required when the filename does not start with YYYY-MM-DD`);
	}

	const date = rawDate instanceof Date ? rawDate : new Date(String(rawDate));

	if (Number.isNaN(date.getTime())) {
		throw new Error(`${filePath}: invalid frontmatter date "${rawDate}"`);
	}

	return date.toISOString();
}

async function readPost(filePath) {
	const raw = readFileSync(filePath, 'utf8');
	const slug = basename(filePath, extname(filePath));
	const { metadata, body } = splitFrontmatter(raw, filePath);
	const html = await marked.parse(body);

	return {
		slug,
		title: String(metadata.title ?? titleFromSlug(slug)),
		date: normalizeDate(metadata.date, slug, filePath),
		tags: normalizeTags(metadata.tags),
		visibility: String(metadata.visibility ?? 'public'),
		html
	};
}

function writeGeneratedData(posts) {
	mkdirSync(generatedDir, { recursive: true });

	const postIndex = posts.map(({ slug, title, date, tags, visibility }) => ({
		slug,
		title,
		date,
		tags,
		visibility
	}));
	const tags = [...new Set(postIndex.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));

	writeFileSync(
		join(generatedDir, 'postIndex.ts'),
		`// Generated from src/content/posts by scripts/build-posts.mjs.
export interface StaticPostSummary {
\tslug: string;
\ttitle: string;
\tdate: string;
\ttags: string[];
\tvisibility: string;
}

export const posts = ${JSON.stringify(postIndex, null, '\t')} satisfies StaticPostSummary[];

export const tags = ${JSON.stringify(tags, null, '\t')};
`
	);

	const postHtmlBySlug = Object.fromEntries(posts.map((post) => [post.slug, post.html]));
	writeFileSync(
		join(generatedDir, 'postHtml.ts'),
		`// Generated from src/content/posts by scripts/build-posts.mjs.
export const postHtmlBySlug: Record<string, string> = ${JSON.stringify(postHtmlBySlug, null, '\t')};
`
	);
}

if (!existsSync(contentDir)) {
	throw new Error(`Content directory not found: ${contentDir}`);
}

rmSync(generatedDir, { recursive: true, force: true });

const posts = (
	await Promise.all(
		readdirSync(contentDir)
			.filter((fileName) => fileName.endsWith('.md'))
			.sort((a, b) => a.localeCompare(b))
			.map((fileName) => readPost(join(contentDir, fileName)))
	)
).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() || a.slug.localeCompare(b.slug));

writeGeneratedData(posts);

console.log(`Built ${posts.length} posts from ${contentDir}`);
