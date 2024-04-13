import 'styles';

import {lazy} from 'react';
import {AppRegistry} from 'react-native';
import {App} from 'App';
import config from 'config';

export const AppLayouts = {
  Main: lazy(() => import('./core/LayoutMain')),
};

export const AppScreens = {
  Home: lazy(() => import('./core/ScreenHome')),
  TaskList: lazy(() => import('./tasks/views/TasksList')),
  TaskDetails: lazy(() => import('./tasks/views/TasksList')),
  Settings: lazy(() => import('./settings/ScreenSettings')),
};

AppRegistry.registerComponent(config.APP_NAME, () => () => (
  <App Layout={AppLayouts} Screen={AppScreens}/>
));

AppRegistry.runApplication(config.APP_NAME, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
