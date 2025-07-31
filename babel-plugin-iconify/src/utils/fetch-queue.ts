import type * as i from '@iconify/react/dist/iconify.js';

import {saveIconSet} from './persist';
import {loadedIcons, iconJsonCache, pendingFetches} from './global-state';

/**
 * Fetch icon set JSON with deduplication to prevent multiple
 * simultaneous requests for the same icon set
 */
export async function fetchIconSetWithDeduplication(set: string, icons: string[]): Promise<i.IconifyJSON> {
  // Create a unique key for this fetch request
  const sortedIcons = icons.sort();
  const key = `${set}:${sortedIcons.join(',')}`;

  // If there's already a pending fetch for this exact request, wait for it
  if (pendingFetches.has(key)) {
    return pendingFetches.get(key)!;
  }

  // If there's a pending fetch for this set (even with different icons),
  // wait for it and then fetch any remaining icons
  const setKey = `${set}:*`;
  if (pendingFetches.has(setKey)) {
    await pendingFetches.get(setKey)!;
    // After the previous fetch completes, filter out already loaded icons
    const remainingIcons = icons.filter(name => !loadedIcons.has(`${set}:${name}`));
    if (remainingIcons.length === 0) {
      // All icons are now loaded, return the cached data
      return iconJsonCache.get(set)!;
    }
    // Update the icons list to only include remaining icons
    icons = remainingIcons;
  }

  // Create the fetch promise
  const fetchPromise = performFetch(set, icons);

  // Store the promise for deduplication
  pendingFetches.set(key, fetchPromise);
  pendingFetches.set(setKey, fetchPromise);

  try {
    const result = await fetchPromise;
    return result;
  } finally {
    // Clean up the pending fetch entries
    pendingFetches.delete(key);
    pendingFetches.delete(setKey);
  }
}

/**
 * Perform the actual HTTP fetch for icon data
 */
async function performFetch(set: string, icons: string[]): Promise<i.IconifyJSON> {
  const res = await fetch(`https://api.iconify.design/${set}.json?icons=${icons.join(',')}`);
  if (!res.ok) {
    throw new Error(`Iconify: Failed to fetch data for the set with prefix: "${set}"`);
  }

  const json = await res.json() as i.IconifyJSON;

  // Merge with existing cached data
  const cached = iconJsonCache.get(set);
  if (cached) {
    json.icons = {...cached.icons, ...json.icons};
  }

  // Save the updated icon set
  saveIconSet(set, json, icons);

  return json;
}
