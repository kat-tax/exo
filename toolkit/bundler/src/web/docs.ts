import {defineConfig, mergeConfig} from 'vite';
import webConfig from '../vite.web.js';

export default defineConfig(env => mergeConfig(
  webConfig(env),
  defineConfig({}),
));
