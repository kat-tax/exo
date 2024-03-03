import {defineConfig} from 'vocs';
import vite from 'cfg/web/vite.config';

import general from './config/brand/general';
import socials from './config/brand/socials';
import topNav from './config/brand/topNav';
import theme from './config/brand/theme';

import exo from './config/sidebar/exo';
import library from './config/sidebar/library';

export default defineConfig({
  ...general,
  socials,
  topNav,
  theme,
  sidebar: [
    ...library,
    ...exo,
  ],
  rootDir: '.',
  vite,
});
