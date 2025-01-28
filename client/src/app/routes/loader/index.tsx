import {lazy} from 'react';
import Settings from '../ScreenSettings';

export const Layout = {
  App: lazy(
    () => import('../Layout')
  ),
}

export const Screen = {
  Settings,
  Storage: lazy(
    () => import('../ScreenStorage')
  ),
  Teaser: lazy(
    () => import('../ScreenTeaser')
  ),
  Home: lazy(
    () => import('../../../home/routes/ScreenHome')
  ),
  Inbox: lazy(
    () => import('../../../home/routes/ScreenInbox')
  ),
  Room: lazy(
    () => import('../../../home/routes/ScreenRoom')
  ),
  Browse: lazy(
    () => import('../../../media/routes/ScreenBrowse')
  ),
  Ipfs: lazy(
    () => import('../../../media/routes/ScreenIpfs')
  ),
  World: lazy(
    () => import('../../../world/routes/ScreenWorld')
  ),
  Map: lazy(
    () => import('../../../world/routes/ScreenMap')
  ),
  Calendar: lazy(
    () => import('../../../world/routes/ScreenCalendar')
  ),
  Design: lazy(
    () => import('../../../dev/routes/ScreenDesign')
  ),
  Library: lazy(
    () => import('../../../dev/routes/ScreenLibrary')
  ),
}
