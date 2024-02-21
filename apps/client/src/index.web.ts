import {AppRegistry} from 'react-native';
import {App} from 'App';
import 'styles';

const appKey = 'client';

AppRegistry.registerComponent(appKey, () => App);
AppRegistry.runApplication(appKey, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
