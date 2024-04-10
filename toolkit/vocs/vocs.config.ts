import {defineConfig} from 'vocs';
import docsConfig from 'config/docs';
import viteDocs from 'builder/vite.docs';

export default defineConfig({
  ...docsConfig,
  rootDir: './',
  ogImageUrl: 'https://vocs.dev/api/og?logo=%logo&title=%title&description=%description',
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
