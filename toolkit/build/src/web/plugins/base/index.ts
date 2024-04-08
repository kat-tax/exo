import type {Plugin} from 'vite';

import paths from 'vite-tsconfig-paths';
import commonjs from '@originjs/vite-plugin-commonjs';

export default <Plugin[]> [
  commonjs.viteCommonjs(),
  paths(),
]
