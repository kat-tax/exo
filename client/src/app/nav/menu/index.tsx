import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View, ScrollView} from 'react-native';

import {useLinkData} from './use-link-data';
import {MenuHeader} from './menu-header';
import {MenuFooter} from './menu-footer';
import {MenuGroup} from './menu-group';
import {MenuItemTab} from './menu-item-tab';
import {MenuItemList} from './menu-item-list';
import {MenuItemIcon} from './menu-item-icon'

import type {LayoutProps} from '../layout';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export function Tabs(props: LayoutProps) {
  const {config, links} = useLinkData();
  const {state, navigation} = props;
  const activeRoute = state.routes[state.index];

  return (
    <View style={styles.tabs}>
      {config.tabs.map((tab) => (
        <MenuItemTab
          key={tab}
          name={tab}
          {...{navigation, activeRoute}}
          {...links[tab]}
        />
      ))}
    </View>
  );
}

export function Menu(props: LayoutProps) {
  const {t} = useLingui();
  const {config, links} = useLinkData();
  const {state, navigation} = props;
  const activeRoute = state.routes[state.index];

  return (
    <View style={styles.menu}>
      <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.list}>
          <MenuHeader/>
          {config.menuTop.map((link) => (
            <MenuItemList
              key={link}
              name={link}
              {...{navigation, activeRoute}}
              {...links[link]}
            />
          ))}
          {__DEV__ &&
            <MenuGroup label={t`Development`}>
              {config.menuDevMenu.map((link) => (
                <MenuItemList
                  key={link}
                  name={link}
                  {...{navigation, activeRoute}}
                  {...links[link]}
                />
              ))}
            </MenuGroup>
          }
        </View>
        <MenuFooter actions={
          <View style={styles.actions}>
            {config.menuFooterIcons.map((link) => (
              <MenuItemIcon
                key={link}
                name={link}
                {...{navigation, activeRoute}}
                {...links[link]}
              />
            ))}
          </View>
        }/>
      </ScrollView>
    </View>
  );
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
