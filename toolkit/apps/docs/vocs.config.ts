import {defineConfig} from 'vocs';
import docsConfig from 'config/docs';
import viteBase from 'build/vite.base';

export default defineConfig({
  ...docsConfig,
  rootDir: './',
  vite: viteBase({
    command: 'build',
    mode: '',
  }),
  twoslash: {
    compilerOptions: {
      moduleResolution: 100,
    }
  },
});
