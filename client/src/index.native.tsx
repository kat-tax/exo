import 'design/styles';
import 'react-exo/gesture';
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

import {AppRegistry} from 'react-native';
import AppRoot from 'app';
import cfg from 'config';

AppRegistry.registerComponent(cfg.APP_NAME, () => AppRoot);
