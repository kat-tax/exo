import {defineConfig} from 'vite';
import plugins from './plugins/base/index.js';

export default defineConfig(env => ({
  plugins,
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
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
  },
  define: {
    __DEV__: JSON.stringify(env.mode === 'development'),
    global: 'window',
  },
}));
