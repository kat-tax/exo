import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import 'common/utils/styles';

import {App} from 'App';
import {AppRegistry} from 'react-native';
import {Navigation} from 'react-native-navigation';
import config from 'react-native-ultimate-config';

AppRegistry.registerComponent(config.APP_NAME, () => App);
Navigation.registerComponent(config.APP_PACKAGE, () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: config.APP_PACKAGE,
            },
          },
        ],
      },
     },
  });
});
