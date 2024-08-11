import {Outlet} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, StatusBar} from 'react-native';
import {useCurrentResource} from 'app/hooks/useCurrentResource';
import {useDeviceSession} from 'app/hooks/useDeviceSession';
import {useProfile} from 'app/data';
import {Menu} from 'app/interface/Menu';
import {Tabs} from 'app/interface/Tabs';
import {CurrentFile} from 'media/stacks/CurrentFile';

import type {useAppContext} from 'app/hooks/useAppContext';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function MainLayout() {
  const {styles, theme} = useStyles(stylesheet);
  const resource = useCurrentResource();
  const screen = useWindowDimensions();
  const device = useDeviceSession();
  const profile = useProfile();

  const isVertical = screen.width < theme.breakpoints.sm;
  const hasTabs = screen.width < theme.breakpoints.xs;
  const vstyles = {
    root: [styles.root, hasTabs && styles.rootTabs],
    menu: [styles.menu, hasTabs && styles.menuTabs],
    content: [styles.content, isVertical && styles.contentVert],
  };

  const context: ReturnType<typeof useAppContext> = {
    profile,
    device,
  };

  return <>
    <StatusBar networkActivityIndicatorVisible={!device?.online}/>
    <View style={vstyles.root}>
      <View style={vstyles.menu}>
        {hasTabs ? <Tabs/> : <Menu {...{profile}}/>}
      </View>
      <View style={vstyles.content}>
        <Outlet {...{context}}/>
        {Boolean(resource.path) &&
          <CurrentFile
            path={resource.path}
            vertical={isVertical}
            maximized={resource.maximized}
            close={() => resource.setPath('')}
          />
        }
      </View>
    </View>
  </>;
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
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  contentVert: {
    flexDirection: 'column-reverse',
  },
}));
