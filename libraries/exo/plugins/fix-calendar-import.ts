import fs from 'node:fs/promises';
import type {Plugin} from 'vite';

export default {
  name: 'fix-calendar-import',
  async writeBundle() {
    const target = './gen/calendar.js';
    try {
      await fs.access(target);
    } catch {
      return;
    }
    const motion = await fs.readFile(target, {encoding: 'utf-8'});
    await fs.writeFile(
      target,
      motion.replace(
        'import fe, { StyleSheet as we',
        'import * as fe from "react-native";import { StyleSheet as we'
      )
    )
  }
} as Plugin;
