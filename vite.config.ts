import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'bangumi-api',
      fileName: 'index',
    },
  },
});
