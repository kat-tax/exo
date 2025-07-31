import {defineConfig} from 'tsdown/config';

export default defineConfig([
  {
    entry: 'plugins/extract.ts',
    platform: 'node',
    exports: true,
  },
  {
    entry: 'plugins/transform.ts',
    platform: 'node',
    exports: true,
  },
]);
