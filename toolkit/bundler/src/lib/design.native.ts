import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

import react from '@vitejs/plugin-react';
import types from 'vite-plugin-dts';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({
    build: {
      outDir: './gen/native',
      cssMinify: 'lightningcss',
      cssCodeSplit: true,
      sourcemap: true,
      lib: {
        formats: ['cjs'],
        entry: {
          index: 'index.ts',
          theme: 'theme.ts',
          styles: 'styles.ts',
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'chunks/[hash]/[name].js',
          entryFileNames: '[name].js',
        },
        external: [
          /* React */
          'react',
          'react-dom',
          'react-native',
          'react/jsx-runtime',
          /* I18n */
          '@linguijs/core',
          '@linguijs/react',
          '@linguijs/macro',
        ],
      },
    },
    plugins: [
      lingui(),
      react({
        babel: {
          plugins: ['macros'],
        },
      }),
    ],
  }),
));
