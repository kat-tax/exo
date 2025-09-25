import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View, ScrollView} from 'react-native';

import {useLinkData} from './use-link-data';
import {MenuHeader} from './menu-header';
import {MenuFooter} from './menu-footer';
import {MenuGroup} from './menu-group';
import {MenuLinkTab} from './menu-link-tab';
import {MenuLinkList} from './menu-link-list';
import {MenuLinkIcon} from './menu-link-icon'

import type {LayoutProps} from '../layout';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export function Tabs(props: LayoutProps) {
  const {config} = useLinkData();
  const {state, navigation} = props;
  const activeRoute = state.routes[state.index];

  return (
    <View style={styles.tabs}>
      {config.tabs.map((tab) => (
        <MenuLinkTab
          key={tab.path}
          {...{navigation, activeRoute}}
          {...tab}
        />
      ))}
    </View>
  );
}

export function Menu(props: LayoutProps) {
  const {t} = useLingui();
  const {config} = useLinkData();
  const {state, navigation} = props;
  const activeRoute = state.routes[state.index];

  return (
    <View style={styles.menu}>
      <ScrollView style={styles.scroll} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.list}>
          <MenuHeader/>
          {config.menuTop.map((link) => (
            <MenuLinkList
              key={link.path}
              {...{navigation, activeRoute}}
              {...link}
            />
          ))}
          {__DEV__ &&
            <MenuGroup label={t`Development`}>
              {config.menuDevMenu.map((link) => (
                <MenuLinkList
                  key={link.path}
                  {...{navigation, activeRoute}}
                  {...link}
                />
              ))}
            </MenuGroup>
          }
        </View>
        <MenuFooter actions={
          <View style={styles.actions}>
            {config.menuFooterIcons.map((link) => (
              <MenuLinkIcon
                key={link.path}
                {...{navigation, activeRoute}}
                {...link}
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
