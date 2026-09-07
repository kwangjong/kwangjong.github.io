#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const defaultDump = resolve(repoRoot, '..', 'mongodb-dump', 'db', 'post.bson');
const dumpPath = resolve(process.argv[2] ?? defaultDump);
const legacyOrderPath = join(repoRoot, 'src', 'routes', 'blog', '[slug]', 'list.json');
const contentOrderPath = join(repoRoot, 'src', 'content', 'post-order.json');
const contentDir = join(repoRoot, 'src', 'content', 'posts');
const generatedDir = join(repoRoot, 'src', 'lib', 'generated');
const localBsondump = resolve(
	repoRoot,
	'..',
	'.local',
	'mongodb-database-tools',
	'mongodb-database-tools-macos-arm64-100.18.0',
	'bin',
	'bsondump'
);

function resolveBsondump() {
	if (process.env.BSONDUMP_BIN) return process.env.BSONDUMP_BIN;
	if (existsSync(localBsondump)) return localBsondump;

	try {
		return execFileSync('which', ['bsondump'], { encoding: 'utf8' }).trim();
	} catch {
		throw new Error('bsondump was not found. Install MongoDB Database Tools or set BSONDUMP_BIN.');
	}
}

function readJsonLinesFromBson(path) {
	const output = execFileSync(resolveBsondump(), ['--type=json', path], {
		encoding: 'utf8',
		maxBuffer: 100 * 1024 * 1024
	});

	return output
		.split('\n')
		.filter((line) => line.trim().startsWith('{'))
		.map((line) => JSON.parse(line));
}

function readOrder() {
	const orderPath = existsSync(contentOrderPath) ? contentOrderPath : legacyOrderPath;

	if (existsSync(orderPath)) {
		return JSON.parse(readFileSync(orderPath, 'utf8'));
	}

	try {
		return JSON.parse(
			execFileSync('git', ['show', 'HEAD:src/routes/blog/[slug]/list.json'], {
				cwd: repoRoot,
				encoding: 'utf8'
			})
		);
	} catch {
		// The repository may no longer have the legacy API cache in history.
	}

	return null;
}

function bsonDateToIso(value) {
	if (value?.$date?.$numberLong) {
		return new Date(Number(value.$date.$numberLong)).toISOString();
	}

	if (value?.$date) {
		return new Date(value.$date).toISOString();
	}

	return new Date(value).toISOString();
}

function writePostMarkdown(posts) {
	rmSync(contentDir, { recursive: true, force: true });
	mkdirSync(contentDir, { recursive: true });

	for (const post of posts) {
		const markdown = post.markdown.endsWith('\n') ? post.markdown : `${post.markdown}\n`;
		writeFileSync(join(contentDir, `${post.url}.md`), markdown);
	}
}

function writePostOrder(posts) {
	writeFileSync(
		contentOrderPath,
		`${JSON.stringify(
			posts.map((post) => post.url),
			null,
			2
		)}\n`
	);
}

function writeGeneratedData(posts) {
	mkdirSync(generatedDir, { recursive: true });

	const postIndex = posts.map((post) => ({
		slug: post.url,
		title: post.title,
		date: bsonDateToIso(post.date),
		tags: post.tags ?? [],
		visibility: post.visibility ?? 'public'
	}));
	const tags = [...new Set(postIndex.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));

	writeFileSync(
		join(generatedDir, 'postIndex.ts'),
		`export interface StaticPostSummary {
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

	const postHtmlBySlug = Object.fromEntries(posts.map((post) => [post.url, post.html ?? '']));
	writeFileSync(
		join(generatedDir, 'postHtml.ts'),
		`export const postHtmlBySlug: Record<string, string> = ${JSON.stringify(postHtmlBySlug, null, '\t')};
`
	);
}

if (!existsSync(dumpPath)) {
	throw new Error(`MongoDB dump not found: ${dumpPath}`);
}

const docs = readJsonLinesFromBson(dumpPath);
const bySlug = new Map(docs.map((doc) => [doc.url, doc]));
const order = readOrder();
const defaultOrder = docs
	.filter((doc) => doc.visibility !== 'private')
	.sort((a, b) => new Date(bsonDateToIso(b.date)).getTime() - new Date(bsonDateToIso(a.date)).getTime())
	.map((doc) => doc.url);
const posts = (order ?? defaultOrder)
	.map((slug) => bySlug.get(slug))
	.filter(Boolean);

if (posts.length === 0) {
	throw new Error('No posts were selected from the dump.');
}

writePostMarkdown(posts);
writePostOrder(posts);
writeGeneratedData(posts);

console.log(`Imported ${posts.length} posts from ${dumpPath}`);
