/** @type {import('vite').UserConfig} */

export default {
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
}
