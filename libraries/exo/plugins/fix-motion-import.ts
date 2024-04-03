import fs from 'node:fs/promises';
import type {Plugin} from 'vite';

export default {
  name: 'fix-motion-import',
  async writeBundle() {
    const target = './gen/motion.js';
    try {
      await fs.access(target);
    } catch {
      return;
    }
    const motion = await fs.readFile(target, {encoding: 'utf-8'});
    await fs.writeFile(
      target,
      motion.replace(
        'import Re from "react-native";',
        'import * as Re from "react-native";'
      )
    )
  }
} as Plugin;
