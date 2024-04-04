import type {Plugin} from 'vite';
import {access, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

export default {
  name: 'fix-motion-import',
  async writeBundle() {
    const target = resolve(process.cwd(), 'gen/motion.js');
    try {
      await access(target);
    } catch {
      return;
    }
    const motion = await readFile(target, {encoding: 'utf-8'});
    await writeFile(
      target,
      motion.replace(
        'import Re from "react-native";',
        'import * as Re from "react-native";'
      )
    )
  }
} as Plugin;
