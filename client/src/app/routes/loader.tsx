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
  Home: lazy(() => import('../../home/routes/ScreenHome')),
  // Media
  Browse: lazy(() => import('../../media/routes/ScreenBrowse')),
  // World
  World: lazy(() => import('../../world/routes/ScreenWorld')),
  Map: lazy(() => import('../../world/routes/ScreenMap')),
  Calendar: lazy(() => import('../../world/routes/ScreenCalendar')),
  // Dev
  Design: lazy(() => import('../../dev/routes/ScreenDesign')),
  Library: lazy(() => import('../../dev/routes/ScreenLibrary')),
}
