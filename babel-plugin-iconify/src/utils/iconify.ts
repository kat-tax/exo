import type * as i from '@iconify/react/dist/iconify.js';

import {getIconData} from '@iconify/utils';
import {loadedIcons, iconJsonCache} from './global-state';

/**
 * Get icon data for a specific icon if it's been loaded
 */
export function getIconifyData(icon: i.IconifyIconName): i.IconifyIcon | null {
  const isLoaded = loadedIcons.get(`${icon.prefix}:${icon.name}`);
  const json = iconJsonCache.get(icon.prefix);

  if (!isLoaded || !json) {
    return null;
  }

  const data = getIconData(json, icon.name);
  return data;
}


