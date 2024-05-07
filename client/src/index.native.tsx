import 'design/styles';
//import 'react-exo/gesture';
//import 'react-native-get-random-values';
//import 'react-native-url-polyfill/auto';

import {AppRegistry} from 'react-native';
import AppRoot from 'app';
import config from 'config';

AppRegistry.registerComponent('EXO', () => AppRoot);

console.log(config.APP_NAME);
console.log('EXO');