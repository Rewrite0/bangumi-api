import { defineConfig, type UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
  const config: UserConfigExport = {
    plugins: [
      dts({
        rollupTypes: true,
      }),
    ],
    build: {
      rollupOptions: {
        external: ['axios'],
      },
      lib: {
        entry: './src/index.ts',
        name: 'BangumiApi',
        fileName: 'index',
        formats: ['es'],
      },
    },
  };

  if (command === 'build') {
    return {
      esbuild: {
        drop: ['console', 'debugger'],
      },
      ...config,
    };
  } else {
    return config;
  }
});
