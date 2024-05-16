import {defineConfig} from 'vite';
import paths from 'vite-tsconfig-paths';

export default defineConfig(env => ({
  define: {
    __DEV__: JSON.stringify(env.mode === 'development'),
  },
  plugins: [
    paths(),
  ],
}));
