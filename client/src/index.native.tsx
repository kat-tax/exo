import 'design/styles';
import 'react-exo/gesture';
import 'react-native-url-polyfill/auto';
import 'react-native-random-values-jsi-helper';

import {init} from '@noriginmedia/norigin-spatial-navigation';
import {AppRegistry} from 'react-native';
import AppRoot from 'app';
import cfg from 'config';

init({nativeMode: true});

AppRegistry.registerComponent(cfg.APP_NAME, () => AppRoot);
