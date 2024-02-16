import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {defineConfig} from 'vite';

import types from 'vite-plugin-dts';
import paths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    types({insertTypesEntry: true}),
    paths(),
    react(),
  ],
  build: {
    lib: {
      formats: ['cjs', 'es'],
      entry: {
        hooks: 'src/hooks',
        icon: 'src/components/asset/icon',
        image: 'src/components/asset/image',
        video: 'src/components/asset/video',
        lottie: 'src/components/asset/lottie',
        slider: 'src/components/interface/slider',
      }
    },
    rollupOptions: {
      output: {
        dir: 'dist',
        chunkFileNames: '_chunks/[format]/[name]-[hash].js',
        assetFileNames(chunkInfo) {
          return (chunkInfo.name === 'index.css')
            ? 'video.css'
            : `[name].[ext]`;
        },
      },
      external: [
        'react',
        'react-dom',
        'react-native',
        'react-native-web',
        'react/jsx-runtime',
      ],
    },
    cssMinify: 'lightningcss',
    cssCodeSplit: true,
    sourcemap: true,
  },
});
