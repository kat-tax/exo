import {Fragment} from 'react';
import {Navigation} from 'react-native-navigation';

export function Screen(props: any) {
  return (
  <Fragment>{props.children}</Fragment>
  );
};

Navigation.registerComponent('Screen', () => Screen);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Home'
            }
          }
        ]
      }
    }
  });
});
