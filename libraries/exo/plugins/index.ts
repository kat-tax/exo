import patchMotion from './fix-motion-import';
import type {Plugin} from 'vite';

export default [
  patchMotion,
] as Plugin[];
