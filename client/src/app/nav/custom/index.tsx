import {Icon} from 'react-exo/icon';
import {View, Pressable} from 'react-native';
import {StyleSheet, Display, mq} from 'react-native-unistyles';
import {useState, useEffect, Suspense} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useGet} from 'app/data';
import {Panel} from 'app/ui/panel';
import {isInputFocused} from 'app/lib/interface';
import {breakpoints} from 'design/theme';
import media from 'media/store';

import {Menu, Tabs} from './menu';
import {Preview} from './preview';

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
  const [previewOpen, setPreviewOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  const focused = useGet(media.selectors.getFocused);

  // Media preview
  const previewRoutes = ['MediaBrowseEvolu', 'MediaBrowseLocal'];
  const hasPreview = previewRoutes.includes(activeRoute.name) && previewOpen;

  // Column hotkeys
  useEffect(() => {
    if (!__WEB__) return;
    const down = (e: KeyboardEvent) => {
      if (isInputFocused()) return;
      const {key} = e;
      switch (key) {
        // Toggle main menu
        case '[':
          setMenuOpen(prev => !prev);
          break;
        // Toggle preview
        case ']':
          setPreviewOpen(prev => !prev);
          break;
      }
    };
    window.addEventListener('keydown', down);
    return () => {
      window.removeEventListener('keydown', down);
    };
  }, [setMenuOpen, setPreviewOpen]);

  return (
    <View style={styles.root}>
      <Display mq={mq.only.width(0, breakpoints.xs - 1)}>
        <Tabs {...props}/>
      </Display>
      {menuOpen && (
        <Display mq={mq.only.width(breakpoints.xs)}>
          <Menu {...props}/>
        </Display>
      )}
      <View style={[styles.content, hasPreview && styles.contentWithPreview]}>
        {children}
      </View>
      {hasPreview && (
        <View style={styles.preview}>
          <Preview {...{focused, activeRoute}}/>
        </View>
      )}
    </View>
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
    marginRight: {
      initial: 0,
      xs: theme.display.space2,
    },
  },
  contentWithPreview: {
    marginRight: 0,
  },
  preview: {
    flex: 2,
  },
  headerLeft: {
  },
  headerBack: {
    padding: theme.display.space2,
  },
}));
