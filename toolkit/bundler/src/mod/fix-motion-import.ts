import type {Plugin} from 'vite';

import {resolve} from 'node:path';
import {access, readFile, writeFile} from 'node:fs/promises';

export default <Plugin> {
  name: 'fix-motion-import',
  async writeBundle() {
    const target = resolve(process.cwd(), 'gen/web/motion.js');
    try {
      await access(target);
    } catch (e) {
      throw new Error(`Failed to patch library/gen/motion.js. Does the file exist?\n${target}`);
    }
    const contents = await readFile(target, {encoding: 'utf-8'});
    await writeFile(
      target,
      contents.replace(
        'import Re from "react-native";',
        'import * as Re from "react-native";'
      )
    )
  }
}
