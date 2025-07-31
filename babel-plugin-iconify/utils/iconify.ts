import type * as i from '@iconify/react/dist/iconify.js';

import {getIconData} from '@iconify/utils';
import {saveIconSet} from './persist';
import {loadedIcons, iconJsonCache} from './state';

export async function fetchIconSetJSON(set: string, icons: string[]): Promise<i.IconifyJSON> {
  const res = await fetch(`https://api.iconify.design/${set}.json?icons=${icons.join(',')}`);
  if (!res.ok) throw new Error(`Iconify: Failed to fetch data for the set with prefix: "${set}"`);
  const json = await res.json() as i.IconifyJSON;
  const cached = iconJsonCache.get(set);
  if (cached) json.icons = {...cached.icons, ...json.icons};
  saveIconSet(set, json, icons);
  return json;
}

export function getIconifyData(icon: i.IconifyIconName): i.IconifyIcon | null {
  const loaded = loadedIcons.get(`${icon.prefix}:${icon.name}`);
  const json = iconJsonCache.get(icon.prefix);
  const data = (loaded && json) ? getIconData(json, icon.name) : null;
  return data;
}
