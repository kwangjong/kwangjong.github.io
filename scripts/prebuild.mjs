#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

execFileSync(process.execPath, [join(repoRoot, 'scripts', 'build-posts.mjs')], { stdio: 'inherit' });
rmSync(join(repoRoot, 'build'), { recursive: true, force: true });
console.log('Cleaned build directory');
