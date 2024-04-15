import {lazy} from 'react';

export const Layout = {
  Main: lazy(() => import('../../common/routes/LayoutMain')),
}

export const Screen = {
  Home: lazy(() => import('../../common/routes/ScreenHome')),
  TaskList: lazy(() => import('../../tasks/routes/TasksList')),
  TaskDetails: lazy(() => import('../../tasks/routes/TasksList')),
  Settings: lazy(() => import('../../settings/routes/ScreenSettings')),
}
