import 'styles';

import {AppRegistry} from 'react-native';
import AppRoot from 'app';
import config from 'config';

AppRegistry.registerComponent(config.APP_NAME, () => AppRoot);
AppRegistry.runApplication(config.APP_NAME, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
