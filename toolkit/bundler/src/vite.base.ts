import {defineConfig} from 'vite';
import paths from 'vite-tsconfig-paths';

export default defineConfig(env => ({
  resolve: {
    extensions: [
      '.mjs',
      '.mts',
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        /* React */
        'react',
        'react-dom',
        'react-native',
        'react-native-web',
        'react/jsx-runtime',
        /* I18n */
        '@linguijs/core',
        '@linguijs/react',
        '@linguijs/macro',
      ],
    },
  },
  define: {
    __DEV__: JSON.stringify(env.mode === 'development'),
  },
  plugins: [
    paths(),
  ],
}));
