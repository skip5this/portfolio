import { cpSync, copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const publicDir = resolve(projectRoot, 'public');
const outputDir = resolve(projectRoot, 'dist');

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
cpSync(publicDir, outputDir, { recursive: true });
copyFileSync(resolve(projectRoot, 'index.html'), resolve(outputDir, 'index.html'));

console.log(`Static portfolio built at ${outputDir}`);
