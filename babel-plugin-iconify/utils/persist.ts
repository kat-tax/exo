import type * as i from '@iconify/react/dist/iconify.js';

import {existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {loadedIcons, iconJsonCache} from './state';

const DIR_CACHE = './gen/icons';

export function loadIconSets() {
  if (!existsSync(DIR_CACHE)) return;
  const files = readdirSync(DIR_CACHE);
  const sets = files.filter(file => file.endsWith('.json'));
  for (const set of sets) {
    const json = readFileSync(`${DIR_CACHE}/${set}`, 'utf-8');
    iconJsonCache.set(set, JSON.parse(json) as i.IconifyJSON);
  }
}

export function saveIconSet(set: string, json: i.IconifyJSON, icons: string[]) {
  iconJsonCache.set(set, json);
  for (const icon of icons)
    loadedIcons.set(`${set}:${icon}`, true);
  mkdirSync(DIR_CACHE, {recursive: true});
  writeFileSync(`${DIR_CACHE}/${set}.json`, JSON.stringify(json, null, 2));
}
