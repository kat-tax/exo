import {lazy} from 'react';
import type {JSX} from 'react/jsx-runtime';

type RouterFile = () => Promise<{default: () => JSX.Element}>;
type RouterLayouts = {[slice: string]: React.LazyExoticComponent<() => JSX.Element>};
type RouterScreens = {[slice: string]: {[path: string]: React.LazyExoticComponent<() => JSX.Element>}};

const ctx = {
  layouts: (import.meta as any).glob('./**/layout.tsx', {base: '/'}),
  screens: (import.meta as any).glob('./**/routes/**/*.tsx', {base: '/'}),
};

export const layout = Object.entries(ctx.layouts).reduce((acc, [_, layout]) => {
  const match = _.match(/\.\/src\/([^/]+)\/layout\.tsx$/);
  if (match) acc[match[1]] = lazy(layout as RouterFile);
  return acc;
}, {} as RouterLayouts);

export const screen = Object.entries(ctx.screens).reduce((acc, [_, screen]) => {
  const match = _.match(/\.\/src\/([^/]+)\/routes\/(.+)\.tsx$/);
  if (match) {
    const slice = match[1];
    const path = match[2];
    if (!acc[slice]) acc[slice] = {};
    acc[slice][path] = lazy(screen as RouterFile);
  }
  return acc;
}, {} as RouterScreens);

console.log('>> layout', layout);
console.log('>> screen', screen);
