import {defineConfig} from 'vocs';
import docsConfig from 'cfg/docs';
import viteConfig from 'cfg/vite';

export default defineConfig({
  ...docsConfig,
  rootDir: './',
  vite: {
    plugins: viteConfig.plugins?.slice(0,-1),
    resolve: viteConfig.resolve,
    build: viteConfig.build,
    define: {
      global: 'window',
    },
  },
  twoslash: {
    compilerOptions: {
      moduleResolution: 100,
    }
  },
});
