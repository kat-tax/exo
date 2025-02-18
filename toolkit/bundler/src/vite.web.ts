import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    define: {
      'process.env': {},
    },
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
  }),
));
