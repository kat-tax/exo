import {useNavigation} from '@react-navigation/native';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {StyleSheet, Display, mq} from 'react-native-unistyles';
import {View, Pressable} from 'react-native';
import {Suspense} from 'react';
import {Icon} from 'react-exo/icon';
import {Panel} from 'app/ui/panel';
import {breakpoints} from 'design/theme';
import {Menu, Tabs} from './menu';

import type {NavigationHelpers, NavigationState} from '@react-navigation/native';
import type {NativeStackHeaderLeftProps} from '@react-navigation/native-stack';
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

export function HeaderLeft({canGoBack, tintColor}: NativeStackHeaderLeftProps) {
  const nav = useNavigation();
  return (
    <View style={styles.headerLeft}>
      {canGoBack &&
        <Pressable style={styles.headerBack} onPress={() => nav.goBack()}>
          <Icon
            name="ph:arrow-left"
            size={__TOUCH__ ? 20 : 16}
            color={tintColor}
          />
        </Pressable>
      }
    </View>
  );
}

export const createLayout = (screens: NavScreens, links: Record<string, Array<keyof RootStackParamList>>) => (
  (props: Omit<LayoutProps, 'screens' | 'links'>) => (
    <Layout {...props} screens={screens} links={links}/>
  )
);

export const createScreenLayout = (_screens: NavScreens) => (
  (props: React.PropsWithChildren) => (
    <Suspense fallback={<Panel/>}>
      {props.children}
    </Suspense>
  )
);

const styles = StyleSheet.create((theme) => ({
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
  headerLeft: {
  },
  headerBack: {
    padding: theme.display.space2,
  },
}));
