import {Trans} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
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
        <MenuItem path="/" icon="ph:squares-four">
          <Trans>Dashboard</Trans>
        </MenuItem>
        {lists.map(list =>
          <MenuItem key={list} path={`/tasks/${list}`} icon="ph:list-checks">
            {list}
          </MenuItem>
        )}
        <View style={styles.fill}/>
        <MenuItem path="/settings" icon="ph:gear">
          <Trans>Settings</Trans>
        </MenuItem>
      </View>
    </View>
  );
}

export function MenuItem(props: {path: string, icon?: string} & React.PropsWithChildren) {
  const {styles, theme} = useStyles(stylesheet);
  const {pathname} = useLocation();
  const isActive = props.path === decodeURIComponent(pathname);
  return (
    <Link to={props.path}>
      <View style={[styles.item, isActive && styles.active]}>
        {props.icon && Platform.OS === 'web' &&
          <Icon
            name={props.icon}
            color={theme.colors.primary}
            size={16}
          />
        }
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

