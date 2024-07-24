import {lazy} from 'react';

export const Layout = {
  Main: lazy(() => import('./LayoutMain')),
}

export const Screen = {
  Teaser: lazy(() => import('./ScreenTeaser')),
  Home: lazy(() => import('../../home/routes/ScreenHome')),
  Map: lazy(() => import('../../map/routes/ScreenMap')),
  Calendar: lazy(() => import('../../events/routes/ScreenCalendar')),
  TaskList: lazy(() => import('../../tasks/routes/TaskList')),
  TaskDetails: lazy(() => import('../../tasks/routes/TaskDetails')),
  Settings: lazy(() => import('../../settings/routes/ScreenSettings')),
  Design: lazy(() => import('../../dev/routes/ScreenDesign')),
  Library: lazy(() => import('../../dev/routes/ScreenLibrary')),
}
