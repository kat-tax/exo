import {Outlet} from 'react-exo/navigation';
import {StatusBar} from 'react-native';
import {useWindowDimensions, View} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDevice} from 'app/hooks/useDevice';
import {Menu} from 'app/base/Menu';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function LayoutMain() {
  const {styles, theme} = useStyles(stylesheet);
  const screen = useWindowDimensions();
  const device = useDevice();

  const hasTabs = screen.width <= theme.breakpoints.sm;
  const vstyles = {
    root: [styles.root, hasTabs && styles.rootTabs],
    menu: [styles.menu, hasTabs && styles.menuTabs],
  };

  return <>
    <StatusBar networkActivityIndicatorVisible={!device.online}/>
    <View style={vstyles.root}>
      <View style={vstyles.menu}>
        <Menu tabs={hasTabs}/>
      </View>
      <Outlet context={device}/>
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
