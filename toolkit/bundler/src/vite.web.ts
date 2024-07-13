import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    resolve: {
      extensions: [
        '.web.tsx',
        '.web.ts',
        '.web.js',
        '.mjs',
        '.mts',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ],
      alias: {
        'react-native': 'react-native-web',
      },
    },
    plugins: [
      nodePolyfills({
        include: ['process'],
        globals: {process: true},
      }),
    ],
  }),
));
