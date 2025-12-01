import {View, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';

import {MenuHeader} from './menu-header';
import {MenuFooter} from './menu-footer';
import {MenuGroup} from './menu-group';
import {MenuItemTab} from './menu-item-tab';
import {MenuItemList} from './menu-item-list';
import {MenuItemIcon} from './menu-item-icon';

import type {LayoutProps} from '../';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export function Tabs({state, navigation, screens, links}: LayoutProps) {
  const activeRoute = state.routes[state.index];
  const {ref, focusKey} = useFocusable({
    forceFocus: true,
    preferredChildFocusKey: getPreferredChildFocusKey(state),
    saveLastFocusedChild: false,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.tabs}>
        {links.tabs.map((tab) => (
          <MenuItemTab
            key={tab}
            name={tab}
            {...{navigation, activeRoute}}
            {...screens[tab]}
          />
        ))}
      </View>
    </FocusContext.Provider>
  );
}

export function Menu({state, navigation, screens, links}: LayoutProps) {
  const {t} = useLingui();
  const activeRoute = state.routes[state.index];
  const {ref, focusKey} = useFocusable({
    forceFocus: true,
    preferredChildFocusKey: getPreferredChildFocusKey(state),
    saveLastFocusedChild: false,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.menu}>
        <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.list}>
            <MenuHeader/>
            {links.menuTop.map((link) => (
              <MenuItemList
                key={link}
                name={link}
                {...{navigation, activeRoute}}
                {...screens[link]}
              />
            ))}
            <MenuGroup label={t`Media`}>
              {links.menuMedia.map((link) => (
                <MenuItemList
                  key={link}
                  name={link}
                  {...{navigation, activeRoute}}
                  {...screens[link]}
                />
              ))}
            </MenuGroup>
            <MenuGroup label={t`World`}>
              {links.menuWorld.map((link) => (
                <MenuItemList
                  key={link}
                  name={link}
                  {...{navigation, activeRoute}}
                  {...screens[link]}
                />
              ))}
            </MenuGroup>
            {__DEV__ &&
              <MenuGroup label={t`Development`}>
                {links.menuDev.map((link) => (
                  <MenuItemList
                    key={link}
                    name={link}
                    {...{navigation, activeRoute}}
                    {...screens[link]}
                  />
                ))}
              </MenuGroup>
            }
          </View>
          <MenuFooter actions={
            <View style={styles.actions}>
              {links.menuFooterIcons.map((link) => (
                <MenuItemIcon
                  key={link}
                  name={link}
                  {...{navigation, activeRoute}}
                  {...screens[link]}
                />
              ))}
            </View>
          }/>
        </ScrollView>
      </View>
    </FocusContext.Provider>
  );
}

const getPreferredChildFocusKey = (state: LayoutProps['state']) => {
  const activeRoute = state.routes[state.index];
  // Subroute overrides, focus the parent route
  let name = activeRoute?.name;
  switch (name) {
    case 'MediaBrowseEvolu':
    case 'MediaBrowseLocal':
      name = 'MediaBrowseDevices';
      break;
  }
  return name ? `menu-${name}` : undefined;
}

const styles = StyleSheet.create((theme) => ({
  tabs: {
    height: APP_MENU_TAB_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
  menu: {
    width: __WEB__ ? APP_MENU_WIDTH : undefined,
    backgroundColor: theme.colors.background,
  },
  scroll: {
    flex: 1,
    paddingStart: theme.display.space2,
  },
  list: {
    flex: 1,
    flexDirection: 'column',
  },
  actions: {
    flexDirection: 'row',
  },
}));
