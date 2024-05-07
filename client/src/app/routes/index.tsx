import {lazy} from 'react';

export const Layout = {
  Main: lazy(() => import('../../core/routes/LayoutMain')),
}

export const Screen = {
  Home: lazy(() => import('../../core/routes/ScreenHome')),
  TaskList: lazy(() => import('../../tasks/routes/TasksList')),
  TaskDetails: lazy(() => import('../../tasks/routes/TasksDetails')),
  Settings: lazy(() => import('../../settings/routes/ScreenSettings')),
}
