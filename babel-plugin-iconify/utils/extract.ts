import type * as b from '@babel/core';
import type * as t from '@babel/types';
import type * as i from '@iconify/react/dist/iconify.js';

import {stringToIcon} from '@iconify/utils';

const TIP_BROWSE = '\nBrowse all available icons at\nhttps://icones.js.org';

export function getIconFromJSX(jsx: t.JSXElement, t: typeof b.types): i.IconifyIconName | undefined {
  if (!isIconComponent(jsx.openingElement.name, t))
    return;
  const name = getIconNameFromJSX(jsx, t);
  if (!name)
    throw new Error(`Iconify: Prop "name" must be a string literal`);
  const icon = stringToIcon(name);
  if (!icon)
    throw new Error(`Iconify: Failed to find the icon "${name}"${TIP_BROWSE}`);
  return icon;
}

export function getIconNameFromJSX(jsx: t.JSXElement, t: typeof b.types): string | null {
  let name: string | null = null;
  const prop = jsx.openingElement.attributes.find((n):
    n is t.JSXAttribute => t.isJSXAttribute(n) && n.name.name === 'name');
  if (prop?.value?.type === 'StringLiteral') {
    name = prop.value.value;
  } else if (prop?.value?.type === 'JSXExpressionContainer' && prop.value.expression.type === 'StringLiteral') {
    name = prop.value.expression.value;
  }
  return name;
}

export function isIconComponent(node: b.Node, t: typeof b.types): node is t.JSXIdentifier {
  return t.isJSXIdentifier(node) && node.name === 'Icon';
}
