import {resolve} from 'node:path';
import {defineConfig} from 'vite';

import types from 'vite-plugin-dts';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => {
  return {
    plugins: [
      types({rollupTypes: true}),
      paths(),
      react(),
    ],
    build: {
      lib: {
        fileName: 'index',
        formats: ['es', 'cjs'],
        entry: resolve(__dirname, 'src/index.ts'),
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-native'],
      }
    },
    resolve: {
      alias: {'react-native': 'react-native-web'},
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.mjs', '.mts', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  };
});
