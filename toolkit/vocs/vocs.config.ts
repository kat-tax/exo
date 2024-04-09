import {defineConfig} from 'vocs';
import docsConfig from 'config/docs';
import viteDocs from 'builder/vite.docs';

export default defineConfig({
  ...docsConfig,
  rootDir: './',
  twoslash: {
    compilerOptions: {
      moduleResolution: 100,
    }
  },
  vite: viteDocs({
    command: 'build',
    mode: '',
  }),
});
