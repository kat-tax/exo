import {defineConfig} from 'vocs';
import docsConfig from 'cfg/docs';
import viteBase from 'cfg/vite.base';

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
