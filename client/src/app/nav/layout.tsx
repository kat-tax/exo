import {View} from 'react-native';
import {StyleSheet, Display, mq} from 'react-native-unistyles';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {breakpoints} from 'design/theme';
import {Tabs, Menu} from 'app/nav/menu';

import type {NavigationHelpers, NavigationState} from '@react-navigation/native';
import type {RootStackParamList} from 'app/nav/types';

export const APP_MENU_WIDTH = 146;
export const APP_MENU_TAB_HEIGHT = 64;

export interface LayoutProps {
  state: NavigationState<RootStackParamList>;
  navigation: NavigationHelpers<RootStackParamList, {}>;
  children: React.ReactNode;
};

export function Layout(props: LayoutProps) {
  const {state, children} = props;
  const activeRoute = state.routes[state.index];
  const {ref, focusKey} = useFocusable({
    forceFocus: true,
    isFocusBoundary: true,
    focusBoundaryDirections: ['up', 'down'],
    preferredChildFocusKey: `menu@${activeRoute?.key}`,
  });

  return (
    <View ref={ref} style={styles.root}>
      <Display mq={mq.only.width(0, breakpoints.xs - 1)}>
        <Tabs {...props}/>
      </Display>
      <Display mq={mq.only.width(breakpoints.xs)}>
        <FocusContext.Provider value={focusKey}>
          <Menu {...props}/>
        </FocusContext.Provider>
      </Display>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create(() => ({
  root: {
    flex: 1,
    flexDirection: {
      initial: 'column-reverse',
      xs: 'row',
    },
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
}));
