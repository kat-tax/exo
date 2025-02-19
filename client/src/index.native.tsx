import 'global';
import 'design/styles';
import 'react-exo/gesture';
import 'react-native-url-polyfill/auto';

import {init} from '@noriginmedia/norigin-spatial-navigation';
import {AppRegistry, Platform, LogBox} from 'react-native';
import AppRoot from 'app';
import cfg from 'config';

init({nativeMode: true});

AppRegistry.registerComponent(cfg.APP_NAME, () => AppRoot);

// Ignore all logs on macOS (until 0.77 is fixed)
if (Platform.OS === 'macos') {
  LogBox.ignoreAllLogs();
}
