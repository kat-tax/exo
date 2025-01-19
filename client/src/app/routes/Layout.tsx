import {Outlet} from 'react-exo/navigation';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useWindowDimensions, View, StatusBar} from 'react-native';
import {useDeviceFileSystem} from 'app/hooks/useDeviceFileSystem';
import {useDeviceSession} from 'app/hooks/useDeviceSession';
import {useHotkeys} from 'app/hooks/useHotkeys';
import {useProfile} from 'app/data';
import {toPathInfo} from 'app/utils/formatting';
import {Menu} from 'app/interface/Menu';
import {Tabs} from 'app/interface/Tabs';
import {Media} from 'media/stacks/Media';
import media from 'media/store';

import type {AppContext} from 'app/hooks/useAppContext';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export default function Layout() {
  const {styles, theme} = useStyles(stylesheet);
  const [previewOpen, setPreviewOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  const focused = useSelector(media.selectors.getFocused);
  const profile = useProfile();
  const screen = useWindowDimensions();
  const device = useDeviceSession();
  const filesystem = useDeviceFileSystem();

  const mediaInfo = toPathInfo(focused, false);
  const isVertical = screen.width < theme.breakpoints.sm;
  const hasTabs = screen.width < theme.breakpoints.xs;
  const hasPanel = Boolean(focused);
  const vstyles = {
    root: [styles.root, hasTabs && styles.rootTabs],
    menu: [styles.menu, hasTabs && styles.menuTabs],
    content: [styles.content, isVertical && styles.contentVert],
  };

  const context: AppContext = {
    filesystem,
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
          {hasTabs ? <Tabs/> : <Menu {...{context}}/>}
        </View>
      }
      <View style={vstyles.content}>
        <View style={styles.outlet}>
          <Outlet {...{context}}/>
        </View>
        {hasPanel && focused &&
          <Media
            {...mediaInfo}
            vertical={isVertical}
            maximized={true}
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
