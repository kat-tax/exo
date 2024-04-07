import 'styles';
import 'react-exo/gesture';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import {App} from 'App';
import {AppRegistry} from 'react-native';

export const AppLayouts = {
  Main: require('./core/LayoutMain').default,
}

export const AppScreens = {
  Home: require('./core/ScreenHome').default,
  TaskList: require('./tasks/ScreenTaskList').default,
  TaskDetails: require('./tasks/ScreenTaskList').default,
  Settings: require('./settings/ScreenSettings').default,
}

AppRegistry.registerComponent('exo', () => () => (
  <App
    Layout={AppLayouts}
    Screen={AppScreens}
  />
));
