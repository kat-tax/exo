import {defineConfig, mergeConfig} from 'vite';
import viteConfig from 'cfg/vite';

export default defineConfig(mergeConfig(
  viteConfig,
  defineConfig({
    build: {
      outDir: 'dist/web',
    },
  })
));
