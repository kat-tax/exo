import {lazy} from 'react';

export const Layout = {
  Main: lazy(() => import('./LayoutMain')),
}

export const Screen = {
  Home: lazy(() => import('../../home/routes/ScreenHome')),
  Map: lazy(() => import('../../map/routes/ScreenMap')),
  TaskList: lazy(() => import('../../tasks/routes/TaskList')),
  TaskDetails: lazy(() => import('../../tasks/routes/TaskDetails')),
  Calendar: lazy(() => import('../../events/routes/ScreenCalendar')),
  Settings: lazy(() => import('../../settings/routes/ScreenSettings')),
  Design: lazy(() => import('../../dev/routes/ScreenDesign')),
  Library: lazy(() => import('../../dev/routes/ScreenLibrary')),
}
