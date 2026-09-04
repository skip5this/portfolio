import { cpSync, copyFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const publicDir = resolve(projectRoot, 'public');
const outputDir = resolve(projectRoot, 'dist');
const vendorDir = resolve(outputDir, 'assets', 'vendor');

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });
cpSync(publicDir, outputDir, { recursive: true });
mkdirSync(vendorDir, { recursive: true });
copyFileSync(resolve(projectRoot, 'node_modules', 'lenis', 'dist', 'lenis.min.js'), resolve(vendorDir, 'lenis.min.js'));
copyFileSync(resolve(projectRoot, 'node_modules', 'lenis', 'dist', 'lenis.css'), resolve(vendorDir, 'lenis.css'));
copyFileSync(resolve(projectRoot, 'index.html'), resolve(outputDir, 'index.html'));

console.log(`Static portfolio built at ${outputDir}`);
