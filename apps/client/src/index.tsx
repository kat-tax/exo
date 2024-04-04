import 'styles';

import {App} from 'App';
import {AppRegistry} from 'react-native';
import {lazy} from 'react';

export const AppLayouts = {
  Main: lazy(() => import('./core/LayoutMain')),
};

export const AppScreens = {
  Home: lazy(() => import('./core/ScreenHome')),
  TaskList: lazy(() => import('./tasks/ScreenTaskList')),
  TaskDetails: lazy(() => import('./tasks/ScreenTaskList')),
  Settings: lazy(() => import('./settings/ScreenSettings')),
};

AppRegistry.registerComponent('exo', () => () => (
  <App
    Layout={AppLayouts}
    Screen={AppScreens}
  />
));

AppRegistry.runApplication('exo', {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
