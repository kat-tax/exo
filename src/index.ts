import {AppRegistry} from 'react-native';
import {Main} from 'interface/Main';

AppRegistry.registerComponent('App', () => Main);
AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root'),
});
