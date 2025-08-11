import {lazy} from 'react';
import {startCase} from 'lodash';

import type {JSX} from 'react/jsx-runtime';

type NavFile = () => Promise<{default: () => JSX.Element}>;
type NavLayouts = {[slice: string]: React.LazyExoticComponent<() => JSX.Element>};
type NavScreens = {[slice: string]: {[path: string]: React.LazyExoticComponent<() => JSX.Element>}};

const ctx = {
  layouts: (import.meta as any).glob('./**/layout.tsx', {base: '/'}),
  screens: (import.meta as any).glob('./**/screen-*.tsx', {base: '/'}),
};

export const Layout = Object.entries(ctx.layouts).reduce((acc, [_, layout]) => {
  const match = _.match(/\.\/src\/([^/]+)\/layout\.tsx$/);
  if (match) {
    const slice = startCase(match[1]).replace(/\s/g, '');
    console.log('>> LAYOUT', slice);
    acc[slice] = lazy(layout as NavFile);
  }
  return acc;
}, {} as NavLayouts);

export const Screen = Object.entries(ctx.screens).reduce((acc, [_, screen]) => {
  const match = _.match(/\.\/src\/([^/]+)\/screen-(.+)\.tsx$/);
  if (match) {
    const slice = startCase(match[1]).replace(/\s/g, '');
    const name = startCase(match[2]).replace(/\s/g, '');
    console.log('>> SCREEN', slice, name);
    if (!acc[slice]) acc[slice] = {};
    acc[slice][name] = lazy(screen as NavFile);
  }
  return acc;
}, {} as NavScreens);
