import type {Plugin} from 'vite';

import {resolve} from 'node:path';
import {access, readFile, writeFile} from 'node:fs/promises';

export default <Plugin> {
  name: 'fix-calendar-import',
  async writeBundle() {
    const target = resolve(process.cwd(), 'gen/web/calendar.js');
    try {
      await access(target);
    } catch (e) {
      throw new Error(`Failed to patch library/gen/calendar.js. Does the file exist?\n${target}`);
    }
    const contents = await readFile(target, {encoding: 'utf-8'});
    await writeFile(
      target,
      contents.replace(
        'import oe, { StyleSheet as',
        'import * as oe from "react-native";import { StyleSheet as'
      )
    )
  }
}
