import 'global';
import 'design/styles';

import {init} from '@noriginmedia/norigin-spatial-navigation';
import {AppRegistry} from 'react-native';
import AppRoot from 'app';
import cfg from 'config';

init();

AppRegistry.registerComponent(cfg.APP_NAME, () => AppRoot);
AppRegistry.runApplication(cfg.APP_NAME, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
