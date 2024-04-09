import {defineConfig} from 'vocs';
import docsConfig from 'config/docs';
import viteDocs from 'builder/vite.docs';

export default defineConfig({
  ...docsConfig,
  rootDir: './',
  vite: viteDocs({
    command: 'build',
    mode: '',
  }),
  twoslash: {
    compilerOptions: {
      moduleResolution: 100,
    }
  },
});
