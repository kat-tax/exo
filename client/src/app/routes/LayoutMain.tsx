import {Outlet} from 'react-exo/navigation';
import {StatusBar} from 'react-native';
import {useWindowDimensions, View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDeviceSession} from 'app/hooks/useDeviceSession';
import {useProfile} from 'app/data';
import {Menu} from 'app/base/Menu';

import type {useAppContext} from 'app/hooks/useAppContext';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function LayoutMain() {
  const {styles, theme} = useStyles(stylesheet);
  const profile = useProfile();
  const screen = useWindowDimensions();
  const device = useDeviceSession();
  const hasTabs = screen.width <= theme.breakpoints.xs;
  const vstyles = {
    root: [styles.root, hasTabs && styles.rootTabs],
    menu: [styles.menu, hasTabs && styles.menuTabs],
  };

  return <>
    <StatusBar networkActivityIndicatorVisible={!device?.online}/>
    <View style={vstyles.root}>
      <View style={vstyles.menu}>
        <Menu tabs={hasTabs} profile={profile}/>
      </View>
      <Outlet context={{device, profile} as ReturnType<typeof useAppContext>}/>
    </View>
  </>
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
  },
  rootTabs: {
    flexDirection: 'column-reverse',
  },
  menu: {
    width: APP_MENU_WIDTH,
  },
  menuTabs: {
    width: '100%',
    height: APP_MENU_TAB_HEIGHT,
  },
}));
