import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/plugin.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['@eliza/core']
});

