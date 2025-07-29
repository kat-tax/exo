import {Icon} from 'react-exo/icon';
import {useLingui} from '@lingui/react/macro';
import {useLocation} from 'react-exo/navigation';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, ScrollView} from 'react-native';
import {MenuHeader} from './menu-header';
import {MenuGroup} from './menu-group';
import {MenuItem} from './menu-item';
import {MenuTab} from './menu-tab';

export function Menu() {
  const {t} = useLingui();
  const {styles} = useStyles(stylesheet);
  const {pathname} = useLocation();
  const {ref, focusKey} = useFocusable({
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
    preferredChildFocusKey: `menu@${pathname}`,
    forceFocus: true,
  });

  return (
    <>
      <View style={styles.tabs}>
        <MenuTab
          label={t`Dashboard`}
          icon={<Icon name="ph:squares-four"/>}
          path="/"
        />
        <MenuTab
          label={t`Settings`}
          icon={<Icon name="ph:gear"/>}
          path="/settings"
        />
      </View>
      <View style={styles.menu}>
        <FocusContext.Provider value={focusKey}>
          <ScrollView ref={ref} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.list}>
              <MenuHeader/>
              <MenuItem
                label={t`Dashboard`}
                icon={<Icon name="ph:squares-four"/>}
                path="/"
              />
              <MenuItem
                label={t`Settings`}
                icon={<Icon name="ph:gear"/>}
                path="/settings"
              />
              {__DEV__ &&
                <MenuGroup label={t`Dev Mode`} closed>
                  <MenuItem
                    label={t`Design`}
                    icon={<Icon name="ph:palette"/>}
                    path="/design"
                  />
                </MenuGroup>
              }
            </View>
          </ScrollView>
        </FocusContext.Provider>
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderTopWidth: rt.hairlineWidth,
    backgroundColor: theme.colors.background,
    display: {
      initial: 'flex',
      xs: 'none',
    },
  },
  menu: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    display: {
      initial: 'none',
      xs: 'flex',
    },
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    borderColor: theme.colors.border,
    borderStartWidth: rt.hairlineWidth,
    paddingStart: theme.display.space2,
  },
}));
