import {lazy} from 'react';

export const Layout = {
  Main: lazy(() => import('./MainLayout')),
}

export const Screen = {
  // App
  Settings: lazy(() => import('./ScreenSettings')),
  Storage: lazy(() => import('./ScreenStorage')),
  Teaser: lazy(() => import('./ScreenTeaser')),
  // General
  Home: lazy(() => import('../../home/router/ScreenHome')),
  // Media
  Browse: lazy(() => import('../../media/router/ScreenBrowse')),
  // World
  World: lazy(() => import('../../world/router/ScreenWorld')),
  Map: lazy(() => import('../../world/router/ScreenMap')),
  Calendar: lazy(() => import('../../world/router/ScreenCalendar')),
  // Dev
  Design: lazy(() => import('../../dev/router/ScreenDesign')),
  Library: lazy(() => import('../../dev/router/ScreenLibrary')),
}
