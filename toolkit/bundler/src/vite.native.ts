import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    resolve: {
      extensions: [
        '.native.tsx',
        '.native.ts',
        '.native.js',
        '.mjs',
        '.mts',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.json',
      ],
    },
  }),
));
