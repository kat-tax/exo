import {View, ScrollView} from 'react-native';
import {StyleSheet, Display, mq} from 'react-native-unistyles';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useLocation} from 'react-exo/navigation';
import {useLingui} from '@lingui/react/macro';
import {breakpoints} from 'design/theme';
import {Icon} from 'app/ui/base';

import {MenuTab} from './menu-tab';
import {MenuItem} from './menu-item';
import {MenuGroup} from './menu-group';
import {MenuHeader} from './menu-header';
import {MenuFooter} from './menu-footer';

export function Menu() {
  const {t} = useLingui();
  const {pathname} = useLocation();
  const {ref, focusKey} = useFocusable({
    forceFocus: true,
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
    preferredChildFocusKey: `menu@${pathname}`,
  });

  return (
    <>
      <Display mq={mq.only.width(0, breakpoints.xs - 1)}>
        <View style={styles.tabs}>
          <MenuTab
            label={t`Dashboard`}
            icon={<Icon name="ph:squares-four"/>}
            path="/"
          />
          <MenuTab
            label={t`Lists`}
            icon={<Icon name="ph:list-checks"/>}
            path="/lists"
          />
          <MenuTab
            label={t`Settings`}
            icon={<Icon name="ph:gear"/>}
            path="/settings"
          />
        </View>
      </Display>
      <Display mq={mq.only.width(breakpoints.xs)}>
        <View style={styles.menu}>
          <FocusContext.Provider value={focusKey}>
            <ScrollView ref={ref} style={styles.scroll} contentContainerStyle={{flexGrow: 1}}>
              <View style={styles.list}>
                <MenuHeader/>
                <MenuItem
                  label={t`Dashboard`}
                  icon={<Icon name="ph:squares-four"/>}
                  path="/"
                />
                <MenuItem
                  label={t`Lists`}
                  icon={<Icon name="ph:list-checks"/>}
                  path="/lists"
                />
                {__DEV__ &&
                  <MenuGroup label={t`Development`}>
                    <MenuItem
                      label={t`Design`}
                      icon={<Icon name="ph:palette"/>}
                      path="/design"
                    />
                  </MenuGroup>
                }
              </View>
              <MenuFooter actions={
                <View style={styles.actions}>
                  <MenuItem
                    label={t`Settings`}
                    icon={<Icon name="ph:gear"/>}
                    path="/settings"
                    mode="action"
                  />
                </View>
              }/>
            </ScrollView>
          </FocusContext.Provider>
        </View>
      </Display>
    </>
  );
}

const styles = StyleSheet.create((theme, rt) => ({
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.background,
  },
  menu: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    paddingTop: rt.insets.top / 1.5,
    paddingBottom: rt.insets.bottom / 1.5,
    paddingStart: rt.insets.left,
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
