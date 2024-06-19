import {Trans} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {View, StyleSheet} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLists} from 'tasks/hooks/useLists';
import {MenuItem} from './MenuItem';

interface MenuProps {
  tabs?: boolean,
}

export function Menu(props: MenuProps) {
  const {styles} = useStyles(stylesheet);
  const lists = useLists();
  return (
    <View style={[styles.root, props.tabs && styles.rootTabs]}>
      <MenuItem path="/" icon={<Icon name="ph:squares-four"/>} tab={props.tabs}>
        <Trans>Dashboard</Trans>
      </MenuItem>
      <MenuItem path={`/design`} icon={<Icon name="ph:palette"/>} tab={props.tabs}>
        <Trans>Design</Trans>
      </MenuItem>
      <MenuItem path={`/library`} icon={<Icon name="ph:package"/>} tab={props.tabs}>
        <Trans>Library</Trans>
      </MenuItem>
      <MenuItem path={`/tasks`} icon={<Icon name="ph:list-checks"/>} tab={props.tabs}>
        <Trans>Tasks</Trans>
      </MenuItem>
      {props.tabs ? null : lists.map(list =>
        <MenuItem key={list} path={`/tasks/${list}`} sub>
          {`• ${list}`}
        </MenuItem>
      )}
      <View style={styles.fill}/>
      <MenuItem path="/settings" icon={<Icon name="ph:gear"/>} tab={props.tabs}>
        <Trans>Settings</Trans>
      </MenuItem>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    padding: 10,
    borderColor: theme.colors.border,
    borderRightWidth: StyleSheet.hairlineWidth,
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
