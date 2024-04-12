import 'styles';

import {lazy} from 'react';
import {AppRegistry} from 'react-native';
import {App} from 'App';

export const AppLayouts = {
  Main: lazy(() => import('./core/LayoutMain')),
};

export const AppScreens = {
  Home: lazy(() => import('./core/ScreenHome')),
  TaskList: lazy(() => import('./tasks/views/TasksList')),
  TaskDetails: lazy(() => import('./tasks/views/TasksList')),
  Settings: lazy(() => import('./settings/ScreenSettings')),
};

AppRegistry.registerComponent('exo', () => () => (
  <App Layout={AppLayouts} Screen={AppScreens}/>
));

AppRegistry.runApplication('exo', {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
