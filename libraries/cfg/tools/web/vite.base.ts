import {defineConfig} from 'vite';
import paths from 'vite-tsconfig-paths';
import million from 'million/compiler';

export default defineConfig(env => ({
  plugins: [
    paths(),
    million.vite({
      auto: true,
      telemetry: false,
    }),
  ],
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
    global: 'window',
    __DEV__: env.command === 'serve',
  },
}));
