/** @type {import('vite').UserConfig} */

export default {
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      //'react-native-webview': 'react-native-web-webview',
      //'react-native-linear-gradient': 'react-native-web-linear-gradient',
      //'react-native-vector-icons/MaterialIcons': 'react-native-vector-icons/dist/MaterialIcons',
      //'recyclerlistview': 'recyclerlistview/web',
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
