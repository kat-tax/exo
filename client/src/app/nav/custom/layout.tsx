import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {StyleSheet, Display, mq} from 'react-native-unistyles';
import {View} from 'react-native';
import {breakpoints} from 'design/theme';
import {Menu, Tabs} from './menu';

import type {NavigationHelpers, NavigationState} from '@react-navigation/native';
import type {NavScreens, RootStackParamList} from 'app/nav';

export interface LayoutProps {
  state: NavigationState<RootStackParamList>;
  navigation: NavigationHelpers<RootStackParamList, {}>;
  children: React.ReactNode;
  screens: NavScreens;
  links: Record<string, Array<keyof RootStackParamList>>;
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
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        <Display mq={mq.only.width(0, breakpoints.xs - 1)}>
          <Tabs {...props}/>
        </Display>
        <Display mq={mq.only.width(breakpoints.xs)}>
          <Menu {...props}/>
        </Display>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </FocusContext.Provider>
  );
}

export const createLayout = (screens: NavScreens, links: Record<string, Array<keyof RootStackParamList>>) => (
  (props: Omit<LayoutProps, 'screens' | 'links'>) => (
    <Layout {...props} screens={screens} links={links}/>
  )
);

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
