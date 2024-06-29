import {t} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'design/styles';
import {View, StyleSheet} from 'react-native';
import {useLists} from 'tasks/hooks/useLists';
import {MenuItem} from './MenuItem';
import config from 'config';

interface MenuProps {
  tabs?: boolean,
}

export function Menu(props: MenuProps) {
  const {styles} = useStyles(stylesheet);
  const taskLists = useLists();
  const hasDevMenu = __DEV__ || config.LIB_NAME === 'react-exo';

  useLingui();

  return (
    <View style={[styles.root, props.tabs && styles.rootTabs]}>
      <MenuItem
        path="/"
        label={t`Dashboard`}
        icon={<Icon name="ph:squares-four"/>}
        tab={props.tabs}
      />
      <MenuItem
        path="/calendar"
        label={t`Calendar`}
        icon={<Icon name="ph:calendar"/>}
        tab={props.tabs}
      />
      <MenuItem
        path="/tasks"
        label={t`Tasks`}
        icon={<Icon name="ph:list-checks"/>}
        tab={props.tabs}
      />
      {props.tabs ? null : taskLists.map(({id, complete}) =>
        <MenuItem
          sub
          key={id}
          path={`/tasks/${id}`}
          label={`• ${id}`}
          striked={complete}
        />
      )}
      <View style={styles.fill}/>
      {false &&
        <>
          <MenuItem
            path="/media/files"
            label={t`Files`}
            icon={<Icon name="ph:file-text"/>}
            tab={props.tabs}
          />
          <MenuItem
            path="/media/photos"
            label={t`Photos`}
            icon={<Icon name="ph:image"/>}
            tab={props.tabs}
          />
          <MenuItem
            path="/media/videos"
            label={t`Videos`}
            icon={<Icon name="ph:video"/>}
            tab={props.tabs}
          />
          <MenuItem
            path="/media/audio"
            label={t`Audio`}
            icon={<Icon name="ph:music-notes-simple"/>}
            tab={props.tabs}
          />
        </>
      }
      <View style={styles.fill}/>
      {hasDevMenu &&
        <>
          <MenuItem
            path="/design"
            label={t`Design`}
            icon={<Icon name="ph:palette"/>}
            tab={props.tabs}
          />
          <MenuItem
            path="/library"
            label={t`Library`}
            icon={<Icon name="ph:package"/>}
            tab={props.tabs}
          />
        </>
      }
      <MenuItem
        path="/settings"
        label={t`Settings`}
        icon={<Icon name="ph:gear"/>}
        tab={props.tabs}
      />
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    padding: 10,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.secondary,
  },
  rootTabs: {
    flexDirection: 'row',
    gap: theme.display.space2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: 0,
  },
  fill: {
    flex: 1,
  },
}));
