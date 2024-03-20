/** @type {import('vocs').Config} */

import {defineConfig} from 'vocs';
import vite from '../vite.config.mjs';
import general from './brand/general.mjs';
import socials from './brand/socials.mjs';
import topNav from './brand/topNav.mjs';
import theme from './brand/theme.mjs';
import exo from './sidebar/exo.mjs';
import lib from './sidebar/lib.mjs';

export default defineConfig({
  ...general,
  vite,
  theme,
  topNav,
  socials,
  rootDir: '.',
  sidebar: [
    ...lib,
    ...exo,
  ],
});
