import {defineConfig} from 'vocs';

import exo from './config/sidebar/exo';
import library from './config/sidebar/library';
import general from './config/brand/general';
import socials from './config/brand/socials';
import topNav from './config/brand/topNav';
import theme from './config/brand/theme';

export default defineConfig({
  ...general,
  socials,
  theme,
  topNav,
  sidebar: [
    ...library,
    ...exo,
  ],
  vite: {
    resolve: {
      alias: {'react-native': 'react-native-web'},
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.mjs', '.mts', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  },
  rootDir: '.',
});
