import {Outlet} from 'react-exo/navigation';
import {useState} from 'react';
import {useLocation} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, StatusBar} from 'react-native';
import {useProfile} from 'app/data';
import {useHotkeys} from 'app/hooks/use-hotkeys';
import {useDevice} from 'app/hooks/use-device';
import {useGet} from 'app/data/store';
import {toPathInfo} from 'app/utils/formatting';
import {Menu} from 'app/routes/menu';
import {Media} from 'media/stacks/media';
import media from 'media/store';

import type {AppCtx} from 'app/hooks/use-app';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function Layout() {
  const [previewOpen, setPreviewOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const {styles, theme} = useStyles(stylesheet);
  const {pathname} = useLocation();
  const profile = useProfile();
  const device = useDevice();
  const screen = useWindowDimensions();
  const focused = useGet(media.selectors.getFocused);
  const isVert = screen.width < theme.breakpoints.sm;
  const hasTabs = screen.width < theme.breakpoints.xs;
  const hasPanel = (pathname.includes('/browse') && !isVert) || Boolean(focused);
  const vstyles = {
    root: [styles.root, hasTabs && styles.rootTabs],
    menu: [styles.menu, hasTabs && styles.menuTabs],
    content: [styles.content, isVert && styles.contentVert],
  };

  const context: AppCtx = {
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
        <Outlet {...{context}}/>
        {hasPanel &&
          <Media
            {...toPathInfo(focused || pathname, false)}
            vertical={isVert}
            maximized={true}
            embedded={false}
            close={() => {}}
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
    // flex: 1,
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
