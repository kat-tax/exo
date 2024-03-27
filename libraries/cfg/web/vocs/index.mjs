/** @type {import('vocs').Config} */

import vite from '../vite/index.mjs';
import theme from './brand/theme.mjs';
import topNav from './brand/topNav.mjs';
import socials from './brand/socials.mjs';
import general from './brand/general.mjs';
import library from './sidebar/library.mjs';
import primitives from './sidebar/primitives.mjs';

export default {
  vite,
  theme,
  topNav,
  socials,
  ...general,
  sidebar: [
    ...library,
    ...primitives,
  ],
};
