import {resolve} from 'node:path';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => {
  return {
    build: {
      lib: {
        name: 'Exo',
        formats: ['es'],
        fileName: 'index',
        entry: resolve(__dirname, 'src/index.ts'),
      },
      rollupOptions: {
        external: ['react'],
      },
    },
    esbuild: {
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
    },
  };
});
