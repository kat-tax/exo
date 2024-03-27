import 'styles';

import {App} from 'App';
import {AppRegistry} from 'react-native';
//import config from 'react-native-ultimate-config';

AppRegistry.registerComponent('exo', () => App);
AppRegistry.runApplication('exo', {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
