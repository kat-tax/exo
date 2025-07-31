import {defineConfig} from 'tsdown/config';

export default defineConfig({
  entry: './src/plugins/{extract,transform}.ts',
  platform: 'node',
  sourcemap: true,
  unbundle: true,
  exports: true,
  dts: true,
});
