import 'common/utils/styles';

import {App} from 'App';
import {AppRegistry} from 'react-native';
import config from 'react-native-ultimate-config';

AppRegistry.registerComponent(config.APP_NAME, () => App);
AppRegistry.runApplication(config.APP_NAME, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
