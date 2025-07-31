import type * as i from '@iconify/react/dist/iconify.js';

import {existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {loadedIcons, iconJsonCache} from './global-state';

const DIR_CACHE = './.icons';

export function loadIconSets(): void {
  if (!existsSync(DIR_CACHE)) return;

  try {
    const files = readdirSync(DIR_CACHE);
    const sets = files.filter(file => file.endsWith('.json'));

    for (const setFile of sets) {
      const setName = setFile.replace('.json', '');
      const filePath = `${DIR_CACHE}/${setFile}`;

      try {
        const json = readFileSync(filePath, 'utf-8');
        const iconSet = JSON.parse(json) as i.IconifyJSON;

        // Cache the icon set data
        iconJsonCache.set(setName, iconSet);

        // Mark all icons in this set as loaded
        if (iconSet.icons) {
          for (const iconName of Object.keys(iconSet.icons)) {
            loadedIcons.set(`${setName}:${iconName}`, true);
          }
        }
      } catch (error) {
        console.warn(`Iconify: Failed to load cached icon set "${setName}":`, error);
        // Continue loading other sets even if one fails
      }
    }
  } catch (error) {
    console.warn('Iconify: Failed to read cache directory:', error);
  }
}

export function saveIconSet(set: string, json: i.IconifyJSON, icons: string[]): void {
  iconJsonCache.set(set, json);
  for (const icon of icons)
    loadedIcons.set(`${set}:${icon}`, true);
  mkdirSync(DIR_CACHE, {recursive: true});
  writeFileSync(`${DIR_CACHE}/${set}.json`, JSON.stringify(json, null, 2));
}
