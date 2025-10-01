import {startCase} from 'lodash';

import type {JSX} from 'react/jsx-runtime';

type NavLayouts = {[slice: string]: () => JSX.Element};
type NavScreens = {[slice: string]: () => JSX.Element};

const ctx = {
  layouts: (require as any).context('../../../../', true, /\/layout\.tsx$/),
  screens: (require as any).context('../../../../', true, /\/screen-.+\.tsx$/),
};

export const Layout = ctx.layouts.keys().reduce((acc: NavLayouts, path: string) => {
  const match = path.match(/\.\/src\/([^/]+)\/layout\.tsx$/);
  if (match) {
    const slice = startCase(match[1]).replace(/\s/g, '');
    acc[slice] = ctx.layouts(path).default;
  }
  return acc;
}, {} as NavLayouts);

export const Screen = ctx.screens.keys().reduce((acc: NavScreens, path: string) => {
  const match = path.match(/\.\/src\/([^/]+)\/screen-(.+)\.tsx$/);
  if (match) {
    const slice = startCase(match[1]).replace(/\s/g, '');
    const name = startCase(match[2]).replace(/\s/g, '');
    acc[slice + name] = ctx.screens(path).default;
  }
  return acc;
}, {} as NavScreens);
