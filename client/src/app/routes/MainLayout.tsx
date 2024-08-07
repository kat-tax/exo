import {useState, useEffect} from 'react';
import {useLocation, Outlet} from 'react-exo/navigation';
import {useWindowDimensions, View, StatusBar} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDeviceSession} from 'app/hooks/useDeviceSession';
import {useProfile} from 'app/data';
import {Menu} from 'app/interface/Menu';
import {Tabs} from 'app/interface/Tabs';
import {File} from 'media/stacks/File';

import type {useAppContext} from 'app/hooks/useAppContext';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function MainLayout() {
  const screen = useWindowDimensions();
  const device = useDeviceSession();
  const profile = useProfile();
  const {styles, theme} = useStyles(stylesheet);
  const {pathname, hash} = useLocation();
  const [pinnedFile, setPinnedFile] = useState(`${pathname}/${hash?.slice(1)}`);
  const [pinMaximized, setPinMaximized] = useState(true);
  const context: ReturnType<typeof useAppContext> = {device, profile};
  const tabs = screen.width < theme.breakpoints.xs;
  const vstyles = {
    root: [styles.root, tabs && styles.rootTabs],
    menu: [styles.menu, tabs && styles.menuTabs],
  };

  useEffect(() => {
    if (hash) {
      const path = `${pathname}/${hash?.slice(1)}`;
      if (path !== pinnedFile) {
        setPinnedFile(path);
      }
      setPinMaximized(true);
    } else {
      setPinMaximized(false);
    }
  }, [hash, pathname, pinnedFile]);

  return <>
    <StatusBar networkActivityIndicatorVisible={!device?.online}/>
    <View style={vstyles.root}>
      <View style={vstyles.menu}>
        {tabs ? <Tabs/> : <Menu {...{profile}}/>}
      </View>
      <Outlet {...{context}}/>
      <File
        file={pinnedFile}
        maximized={pinMaximized}
        close={() => setPinnedFile('')}
      />
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
}));
