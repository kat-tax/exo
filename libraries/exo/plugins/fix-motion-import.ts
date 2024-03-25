import fs from 'node:fs/promises';
import type {Plugin} from 'vite';

export default {
  name: 'fix-motion-import',
  async writeBundle() {
    const motion = await fs.readFile('./motion.js', {encoding: 'utf-8'});
    await fs.writeFile(
      './motion.js',
      motion.replace(
        'import Re from "react-native";',
        'import * as Re from "react-native";'
      )
    )
  }
} as Plugin;
