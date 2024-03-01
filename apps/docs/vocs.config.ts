import {defineConfig} from 'vocs';

import general from './config/brand/general';
import socials from './config/brand/socials';
import topNav from './config/brand/topNav';

import start from './config/sidebar/start';
import guides from './config/sidebar/guides';
import library from './config/sidebar/library';
import exo from './config/sidebar/exo';

export default defineConfig({
  rootDir: '.',
  socials,
  topNav,
  sidebar: [
    start,
    guides,
    library,
    ...exo,
  ],
  theme: { 
    variables: {
      color: {
        background: { 
          light: 'white', 
          dark: 'black',
        },
      },
    }
  },
  vite: {
    resolve: {
      alias: {'react-native': 'react-native-web'},
      extensions: ['.web.tsx', '.web.ts', '.web.js', '.mjs', '.mts', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  },
  ...general,
});
