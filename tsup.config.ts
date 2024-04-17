import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'], //include all files under src
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  splitting: false, 
  sourcemap: true,
  clean: true,
  dts: true,
  minify: true,
  bundle: true,
  outDir: 'dist'
});
