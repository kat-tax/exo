import type * as b from '@babel/core';
import type * as t from '@babel/types';

import {fetchIconSetWithDeduplication} from '../utils/fetch-queue';
import {getIconFromJSX} from '../utils/extract';
import {loadedIcons} from '../utils/global-state';
import {loadIconSets} from '../utils/persist';
import {
  addIcon,
  globalSets,
  getUnloadedIcons,
  isInitialized,
  markInitialized
} from '../utils/global-state';

export default (babel: typeof b): b.PluginObj => {
  const {types: t} = babel;

  return {
    name: 'iconify-extract',
    visitor: {
      Program: {
        enter() {
          // Initialize cache on first plugin instance only
          if (!isInitialized) {
            loadIconSets();
            markInitialized();
          }
        }
      },
      JSXElement(path: b.NodePath<t.JSXElement>) {
        // Get the icon object (if any)
        const icon = getIconFromJSX(path.node, t);
        if (!icon) return;

        // Add the hasPlugin prop to the opening element
        path.node.openingElement.attributes.push(t.jSXAttribute(
          t.jSXIdentifier('hasPlugin'),
          t.jSXExpressionContainer(t.booleanLiteral(true))
        ));

        // Record icon in global state for coordinated fetching
        addIcon(icon.prefix, icon.name);
      },
    },
    post() {
      // Fetch all icons that haven't been loaded yet (fire and forget)
      // This runs asynchronously without blocking Babel's synchronous pipeline
      let totalNewIcons = 0;

      for (const prefix of globalSets) {
        const unloadedIcons = getUnloadedIcons(prefix, loadedIcons);
        if (unloadedIcons.length === 0) continue;

        totalNewIcons += unloadedIcons.length;

        // Start fetching asynchronously without awaiting
        // The fetch-queue will handle deduplication and coordination
        fetchIconSetWithDeduplication(prefix, unloadedIcons)
          .then(() => {
            // Success - icons are now loaded and cached for future builds
            if (process.env.NODE_ENV !== 'production') {
              console.log(`Iconify: Successfully fetched ${unloadedIcons.length} icons from "${prefix}" set`);
            }
          })
          .catch((error) => {
            console.error(`Iconify: Failed to fetch icon data for set "${prefix}":`, error.message);
            // Don't throw here as it would crash the build process
          });
      }

      // Provide feedback about what's happening
      if (totalNewIcons > 0 && process.env.NODE_ENV !== 'production') {
        console.log(`Iconify: Fetching ${totalNewIcons} new icons in the background...`);
      }
    },
  };
}
