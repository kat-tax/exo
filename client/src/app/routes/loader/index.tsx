import {lazy} from 'react';
import Settings from '../screen-settings';

export const Layout = {
  App: lazy(
    () => import('../layout')
  ),
}

export const Screen = {
  Settings,
  Storage: lazy(
    () => import('../screen-storage')
  ),
  Room: lazy(
    () => import('../screen-room')
  ),
  Teaser: lazy(
    () => import('../screen-teaser')
  ),
  Home: lazy(
    () => import('../../../home/routes/screen-home')
  ),
  Inbox: lazy(
    () => import('../../../home/routes/screen-inbox')
  ),
  Browse: lazy(
    () => import('../../../media/routes/screen-browse')
  ),
  Ipfs: lazy(
    () => import('../../../media/routes/screen-ipfs')
  ),
  World: lazy(
    () => import('../../../world/routes/screen-world')
  ),
  Map: lazy(
    () => import('../../../world/routes/screen-map')
  ),
  Calendar: lazy(
    () => import('../../../world/routes/screen-calendar')
  ),
  Design: lazy(
    () => import('../../../dev/routes/screen-design')
  ),
  Library: lazy(
    () => import('../../../dev/routes/screen-library')
  ),
}
