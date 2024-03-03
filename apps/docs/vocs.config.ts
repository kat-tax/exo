import {defineConfig} from 'vocs';

import vite from 'cfg/web/vite.config';
import theme from './config/brand/theme';
import topNav from './config/brand/topNav';
import socials from './config/brand/socials';
import general from './config/brand/general';
import indexLib from './config/sidebar/lib';
import indexExo from './config/sidebar/exo';

export default defineConfig({
  ...general,
  vite,
  theme,
  topNav,
  socials,
  rootDir: '.',
  sidebar: [
    ...indexLib,
    ...indexExo,
  ],
});
