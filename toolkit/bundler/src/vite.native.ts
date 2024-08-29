import {defineConfig, mergeConfig} from 'vite';
import baseConfig from './vite.base.js';

export default defineConfig(env => mergeConfig(
  baseConfig(env),
  defineConfig({
    resolve: {
      extensions: [
        '.android.tsx',
        '.android.ts',
        '.android.js',
        '.ios.tsx',
        '.ios.ts',
        '.ios.js',
        '.tvos.tsx',
        '.tvos.ts',
        '.tvos.js',
        '.visionos.tsx',
        '.visionos.ts',
        '.visionos.js',
        '.macos.tsx',
        '.macos.ts',
        '.macos.js',
        '.windows.tsx',
        '.windows.ts',
        '.windows.js',
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
