import 'common/utils/styles';

import config from 'react-native-ultimate-config';
import {AppRegistry} from 'react-native';
import {App} from 'App';

AppRegistry.registerComponent(config.APP_NAME, () => App);
AppRegistry.runApplication(config.APP_NAME, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
