import 'global';
import 'design/styles';
import 'react-exo/sheet.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@fontsource-variable/inter';
import {init} from '@noriginmedia/norigin-spatial-navigation';
import {AppRegistry} from 'react-native';
import {injectStyles} from 'media/file/icons';
import AppRoot from 'app';
import cfg from 'config';

init();
injectStyles();

AppRegistry.registerComponent(cfg.APP_NAME, () => AppRoot);
AppRegistry.runApplication(cfg.APP_NAME, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
