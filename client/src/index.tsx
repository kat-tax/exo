import 'design/styles';
import 'maplibre-gl/dist/maplibre-gl.css';
import 'react-exo/checkbox.css';
import 'react-exo/switch.css';
import 'react-exo/radio.css';
import 'react-exo/slider.css';

import {AppRegistry} from 'react-native';
import {injectStyles} from 'media/file/icons';
import AppRoot from 'app';
import cfg from 'config';

injectStyles();

AppRegistry.registerComponent(cfg.APP_NAME, () => AppRoot);
AppRegistry.runApplication(cfg.APP_NAME, {
  rootTag: document.getElementById('root'),
  mode: 'concurrent',
});
