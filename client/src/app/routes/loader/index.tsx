import {lazy} from 'react';

export const Layout = {
  App: lazy(
    () => import('../Layout')
  ),
}

export const Screen = {
  Settings: lazy(
    () => import('../ScreenSettings')
  ),
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
}
