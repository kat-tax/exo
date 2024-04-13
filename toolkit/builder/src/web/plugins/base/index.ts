import type {Plugin} from 'vite';

import paths from 'vite-tsconfig-paths';

export default <Plugin[]> [
  paths(),
]
