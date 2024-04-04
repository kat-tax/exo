import type {Plugin} from 'vite';
import {access, readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

export default {
  name: 'fix-calendar-import',
  async writeBundle() {
    const target = resolve(process.cwd(), 'gen/calendar.js');
    try {
      await access(target);
    } catch (e) {
      return;
    }
    const motion = await readFile(target, {encoding: 'utf-8'});
    await writeFile(
      target,
      motion.replace(
        'import fe, { StyleSheet as me',
        'import * as fe from "react-native";import { StyleSheet as me'
      )
    )
  }
} as Plugin;
