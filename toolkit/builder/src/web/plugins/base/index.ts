import type {Plugin} from 'vite';

import paths from 'vite-tsconfig-paths';
import {nodePolyfills} from 'vite-plugin-node-polyfills';

export default <Plugin[]> [
  paths(),
  nodePolyfills({
    include: [
      'process',
    ],
    globals: {
      process: true,
    },
  }),
]
