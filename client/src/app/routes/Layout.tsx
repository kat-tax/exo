import {Outlet} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, StatusBar} from 'react-native';
import {useCurrentResource} from 'app/hooks/useCurrentResource';
import {useDeviceSession} from 'app/hooks/useDeviceSession';
import {useProfile} from 'app/data';
import {Menu} from 'app/interface/Menu';
import {Tabs} from 'app/interface/Tabs';
import {resolve} from 'media/utils/path';
import {Media} from 'media/stacks/Media';

import type {useAppContext} from 'app/hooks/useAppContext';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function Layout() {
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

  const parts = resolve(resource.path);
  const [name, ext] = parts.slice(-1)[0].split('.') ?? [];
  const base = parts.slice(0, -1).join('/');
  const path = parts.join('/');
  const url = `/browse/${base}#${name}.${ext}`;
  const hasPath = Boolean(path);
  const context: ReturnType<typeof useAppContext> = {
    profile,
    device,
    layout: {
      hasPreviewPanel: hasPath && resource.maximized,
    },
  };

  return <>
    <StatusBar networkActivityIndicatorVisible={!device?.online}/>
    <View style={vstyles.root}>
      <View style={vstyles.menu}>
        {hasTabs ? <Tabs/> : <Menu {...{profile}}/>}
      </View>
      <View style={vstyles.content}>
        <View style={styles.outlet}>
          <Outlet {...{context}}/>
        </View>
        {hasPath &&
          <Media
            url={url}
            ext={ext}
            name={name}
            path={path}
            vertical={isVertical}
            maximized={resource.maximized}
            close={resource.close}
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
    backgroundColor: theme.colors.neutral,
  },
  rootTabs: {
    flexDirection: 'column-reverse',
  },
  outlet: {
    flex: 1,
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
    flex: 3,
    flexDirection: 'column-reverse',
  },
}));
