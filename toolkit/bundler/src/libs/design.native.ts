import {defineConfig, mergeConfig} from 'vite';
import nativeConfig from '../vite.native.js';

import react from '@vitejs/plugin-react';
import {lingui} from '@lingui/vite-plugin';

export default defineConfig(env => mergeConfig(
  nativeConfig(env),
  defineConfig({
    build: {
      outDir: './gen/native',
      sourcemap: false,
      minify: false,
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
          entryFileNames: '[name].js',
          manualChunks: undefined,
        },
        external: [
          /* React */
          'react',
          'react-dom',
          'react-native',
          'react-native-unistyles',
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
          plugins: ['@lingui/babel-plugin-lingui-macro'],
        },
      }),
    ],
  }),
));
