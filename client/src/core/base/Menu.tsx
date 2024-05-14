import {Icon} from 'react-exo/icon';
import {Trans} from '@lingui/macro';
import {cloneElement} from 'react';
import {View, Text, Platform} from 'react-native';
import {useLocation, Link} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLists} from 'tasks/hooks/useLists';

export function Menu() {
  const {styles} = useStyles(stylesheet);
  const lists = useLists();
  return (
    <View style={styles.root}>
      <View style={styles.fill}>
        <MenuItem path="/" icon={<Icon name="ph:squares-four"/>}>
          <Trans>Dashboard</Trans>
        </MenuItem>
        <MenuItem path="/calendar" icon={<Icon name="ph:calendar-dots"/>}>
          <Trans>Calendar</Trans>
        </MenuItem>
        <MenuItem path={`/tasks`} icon={<Icon name="ph:list-checks"/>}>
          <Trans>Tasks</Trans>
        </MenuItem>
        {lists.map(list =>
          <MenuItem key={list} path={`/tasks/${list}`} submenu>
            {`• ${list}`}
          </MenuItem>
        )}
        <View style={styles.fill}/>
        <MenuItem path="/settings" icon={<Icon name="ph:gear"/>}>
          <Trans>Settings</Trans>
        </MenuItem>
      </View>
    </View>
  );
}

interface MenuItemProps extends React.PropsWithChildren {
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
}

export function MenuItem(props: MenuItemProps) {
  const {styles, theme} = useStyles(stylesheet);
  const {pathname} = useLocation();
  const isActive = props.path === decodeURIComponent(pathname);
  return (
    <Link to={props.path}>
      <View style={[
        styles.item,
        props.submenu && styles.submenu,
        isActive && styles.active,
      ]}>
        {props?.icon && cloneElement(props.icon, {
          color: theme.colors.primary,
          size: 16,
        })}
        <Text style={styles.link}>
          {props.children}
        </Text>
      </View>
    </Link>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    padding: 10,
    height: '100%',
    ...Platform.select({
      default: {
        backgroundColor: theme.colors.secondary,
      },
    }),
  },
  fill: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 5,
  },
  submenu: {
    marginLeft: 8,
  },
  active: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    //backgroundColor: 'rgba(0, 0, 0, 0.07)',
  },
  link: {
    fontSize: 11,
    lineHeight: 24,
    marginLeft: 4,
    color: theme.colors.secondaryForeground,
  },
}));

