#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const defaultDump = resolve(repoRoot, '..', 'mongodb-dump', 'db', 'post.bson');
const dumpPath = resolve(process.argv[2] ?? defaultDump);
const contentDir = join(repoRoot, 'src', 'content', 'posts');
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

	for (const post of posts) {
		const year = bsonDateToIso(post.date).slice(0, 4);
		const postDir = join(contentDir, year);
		const fileName = post.url.replace(/^\d{4}-/, '');
		const markdown = post.markdown.endsWith('\n') ? post.markdown : `${post.markdown}\n`;

		mkdirSync(postDir, { recursive: true });
		writeFileSync(join(postDir, `${fileName}.md`), markdown);
	}
}

if (!existsSync(dumpPath)) {
	throw new Error(`MongoDB dump not found: ${dumpPath}`);
}

const docs = readJsonLinesFromBson(dumpPath);
const posts = docs
	.filter((doc) => doc.visibility !== 'private')
	.sort((a, b) => new Date(bsonDateToIso(b.date)).getTime() - new Date(bsonDateToIso(a.date)).getTime())

if (posts.length === 0) {
	throw new Error('No posts were selected from the dump.');
}

writePostMarkdown(posts);
execFileSync(process.execPath, [join(repoRoot, 'scripts', 'build-posts.mjs')], { stdio: 'inherit' });

console.log(`Imported ${posts.length} posts from ${dumpPath}`);
