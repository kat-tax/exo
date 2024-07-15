import {Trans} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useRTL} from 'react-exo/utils';
import {useLists} from 'tasks/hooks/useLists';
import {isTouch} from 'app/utils/platform';
import config from 'config';

import {MenuHeader} from './MenuHeader';
import {MenuFooter} from './MenuFooter';
import {MenuItem} from './MenuItem';

interface MenuProps {
  tabs?: boolean,
}

export function Menu(props: MenuProps) {
  const rtl = useRTL();
  const lists = useLists();
  const {styles} = useStyles(stylesheet);
  const hasDevMenu = __DEV__ || config.LIB_NAME === 'react-exo';
  return (
    <View style={styles.bg}>
      <ScrollView horizontal={props.tabs} contentContainerStyle={{flexGrow: 1}}>
        <View style={[
          styles.root,
          rtl && styles.rootRTL,
          props.tabs && styles.rootTabs,
        ]}>
          <View style={styles.header}>
            <MenuHeader/>
          </View>
          <MenuItem
            path="/"
            label={<Trans>Dashboard</Trans>}
            icon={<Icon name="ph:squares-four"/>}
            tab={props.tabs}
          />
          <MenuItem
            path="/calendar"
            label={<Trans>Calendar</Trans>}
            icon={<Icon name="ph:calendar-dots"/>}
            tab={props.tabs}
          />
          <MenuItem
            path="/tasks"
            label={<Trans>Tasks</Trans>}
            icon={<Icon name="ph:list-checks"/>}
            tab={props.tabs}
          />
          {props.tabs ? null : lists.map(({id, complete}) =>
            <MenuItem
              sub
              key={id}
              path={`/tasks/${id}`}
              label={<Text>• {id}</Text>}
              striked={complete}
            />
          )}
          <View style={styles.fill}/>
          {hasDevMenu &&
            <>
              <MenuItem
                path="/design"
                label={<Trans>Design</Trans>}
                icon={<Icon name="ph:palette"/>}
                tab={props.tabs}
              />
              <MenuItem
                path="/library"
                label={<Trans>Library</Trans>}
                icon={<Icon name="ph:package"/>}
                tab={props.tabs}
              />
            </>
          }
          <MenuItem
            path="/settings"
            label={<Trans>Settings</Trans>}
            icon={<Icon name="ph:gear"/>}
            tab={props.tabs}
          />
          <View style={styles.footer}>
            <MenuFooter/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  bg: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  root: {
    flex: 1,
    padding: 10,
    borderColor: theme.colors.border,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  rootRTL: {
    borderRightWidth: 0,
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  rootTabs: {
    flexDirection: 'row',
    gap: theme.display.space2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 0,
  },
  header: {
    display: {
      initial: 'none',
      sm: 'flex',
    },
  },
  footer: {
    display: {
      initial: 'none',
      sm: 'flex',
    },
  },
  fill: {
    flex: 1,
  },
  build: {
    color: theme.colors.mutedForeground,
    fontFamily: theme.font.family,
    fontWeight: '500',
    fontSize: 9,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    ...isTouch() && {
      fontSize: theme.font.contentSize,
      lineHeight: theme.font.contentHeight,
      letterSpacing: theme.font.contentSpacing,
    },
  },
}));
