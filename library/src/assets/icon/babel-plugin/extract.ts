import type * as b from '@babel/core';
import type * as t from '@babel/types';

import {getIconFromJSX, fetchIconSetJSON, loadedIcons} from './utils';

export default (babel: typeof b): b.PluginObj => {
  const {types: t} = babel;
  const icons: Record<string, Set<string>> = {};
  const sets = new Set<string>();

  return {
    name: 'iconify-extract',
    visitor: {
      JSXElement(path: b.NodePath<t.JSXElement>) {
        // Get the icon object (if any)
        const icon = getIconFromJSX(path.node, t);
        if (!icon) return;
        // Add the hasPlugin prop to the opening element
        path.node.openingElement.attributes.push(t.jSXAttribute(
          t.jSXIdentifier('hasPlugin'),
          t.jSXExpressionContainer(t.booleanLiteral(true))
        ));
        // Record all icons and sets used
        icons[icon.prefix] = icons[icon.prefix] || new Set<string>();
        icons[icon.prefix].add(icon.name);
        sets.add(icon.prefix);
      },
    },
    post() {
      (async () => {
        for (const prefix of sets) {
          const list = Array.from(icons[prefix]).filter(name => !loadedIcons.has(`${prefix}:${name}`));
          if (list.length === 0) continue;
          const json = await fetchIconSetJSON(prefix, list);
          if (!json) throw new Error(`Iconify: Failed to fetch icon data for set "${prefix}"`);
        }
      })();
    },
  };
}
