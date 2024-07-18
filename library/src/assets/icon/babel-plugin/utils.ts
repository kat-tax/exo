import type * as b from '@babel/core';
import type * as t from '@babel/types';
import type * as i from '@iconify/react/dist/iconify.js';

import {stringToIcon, getIconData} from '@iconify/utils';
import {readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync} from 'fs';

export const loadedIcons = new Map<string, boolean>();
export const iconJsonCache = new Map<string, i.IconifyJSON>();
export const TIP_BROWSE = '\nBrowse all available icons at\nhttps://icones.js.org';
export const DIR_CACHE = './gen/icons';

export function isIconComponent(node: b.Node, t: typeof b.types): node is t.JSXIdentifier {
  return t.isJSXIdentifier(node) && node.name === 'Icon';
}

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

export function getIconifyData(icon: i.IconifyIconName): i.IconifyIcon | null {
  const loaded = loadedIcons.get(`${icon.prefix}:${icon.name}`);
  const json = iconJsonCache.get(icon.prefix);
  const data = (loaded && json) ? getIconData(json, icon.name) : null;
  return data;
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

export async function fetchIconSetJSON(set: string, icons: string[]): Promise<i.IconifyJSON> {
  const res = await fetch(`https://api.iconify.design/${set}.json?icons=${icons.join(',')}`);
  if (!res.ok) throw new Error(`Iconify: Failed to fetch data for the set with prefix: "${set}"`);
  const json = await res.json() as i.IconifyJSON;
  const cached = iconJsonCache.get(set);
  if (cached) json.icons = {...cached.icons, ...json.icons};
  saveIconSet(set, json, icons);
  return json;
}

export function saveIconSet(set: string, json: i.IconifyJSON, icons: string[]) {
  iconJsonCache.set(set, json);
  for (const icon of icons)
    loadedIcons.set(`${set}:${icon}`, true);
  mkdirSync(DIR_CACHE, {recursive: true});
  writeFileSync(`${DIR_CACHE}/${set}.json`, JSON.stringify(json, null, 2));
}

export function loadIconSets() {
  if (!existsSync(DIR_CACHE)) return;
  const files = readdirSync(DIR_CACHE);
  const sets = files.filter(file => file.endsWith('.json'));
  for (const set of sets) {
    const json = readFileSync(`${DIR_CACHE}/${set}`, 'utf-8');
    iconJsonCache.set(set, JSON.parse(json) as i.IconifyJSON);
  }
}

loadIconSets();
