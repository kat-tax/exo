import {Outlet} from 'react-exo/navigation';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, StatusBar} from 'react-native';
import {useDeviceSession} from 'app/hooks/use-device-session';
import {useHotkeys} from 'app/hooks/use-hotkeys';
import {useProfile} from 'app/data';
import {toPathInfo} from 'app/utils/formatting';
import {History} from 'media/stacks/history';
import {Media} from 'media/stacks/media';
import {Menu} from 'app/routes/menu';
import media from 'media/store';

import type {AppContext} from 'app/hooks/use-app-context';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function Layout() {
  const [previewOpen, setPreviewOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const {styles, theme} = useStyles(stylesheet);
  const {pathname} = useLocation();
  const profile = useProfile();
  const device = useDeviceSession();
  const screen = useWindowDimensions();
  const focused = useSelector(media.selectors.getFocused);
  const pathinfo = toPathInfo(focused, false);
  const hasPanel = pathname.includes('/browse') || Boolean(focused);
  const hasTabs = screen.width < theme.breakpoints.xs;
  const isVertical = screen.width < theme.breakpoints.sm;
  const vstyles = {
    root: [styles.root, hasTabs && styles.rootTabs],
    menu: [styles.menu, hasTabs && styles.menuTabs],
    content: [styles.content, isVertical && styles.contentVert],
  };

  const context: AppContext = {
    device,
    profile,
    layout: {
      hasPreviewPanel: hasPanel,
    },
  };

  useHotkeys({
    toggleMenu: () => {
      setMenuOpen(!menuOpen);
    },
    togglePreview: () => {
      setPreviewOpen(!previewOpen);
    },
  });

  return <>
    <StatusBar networkActivityIndicatorVisible={!device?.online}/>
    <View style={vstyles.root}>
      {menuOpen &&
        <View style={vstyles.menu}>
          <Menu {...{context, hasTabs}}/>
        </View>
      }
      <View style={vstyles.content}>
        <View style={styles.outlet}>
          <Outlet {...{context}}/>
        </View>
        {hasPanel ?
          Boolean(focused) ?
            <Media
              {...pathinfo}
              vertical={isVertical}
              maximized={true}
              embedded={false}
              close={() => {}}
            />
          : <History path={focused}/>
        : null}
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
