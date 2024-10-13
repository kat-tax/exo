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
  Browse: lazy(
    () => import('../../../media/routes/ScreenBrowse')
  ),
  View: lazy(
    () => import('../../../media/routes/ScreenView')
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
  Rooms: lazy(
    () => import('../../../live/routes/ScreenRooms')
  ),
  Room: lazy(
    () => import('../../../live/routes/ScreenRoom')
  ),
}
