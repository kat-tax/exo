import {Trans} from '@lingui/macro';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-exo/safearea';
import {useLocation, Link} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'styles';
import {useLists} from 'tasks/hooks/useLists';

export function Menu() {
  const {styles} = useStyles(stylesheet);
  const lists = useLists();
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.fill}>
        <View style={styles.fill}>
          <MenuItem path="/">
            <Trans>Home</Trans>
          </MenuItem>
          {lists.map(list =>
            <MenuItem key={list} path={`/tasks/${list}`}>
              {list}
            </MenuItem>
          )}
          <View style={styles.fill}/>
          <MenuItem path="/settings">
            <Trans>Settings</Trans>
          </MenuItem>
        </View>
      </SafeAreaView>
    </View>
  );
}

export function MenuItem(props: {path: string} & React.PropsWithChildren) {
  const {pathname} = useLocation();
  const {styles} = useStyles(stylesheet);
  const isActive = props.path === pathname;
  return (
    <Link to={props.path}>
      <View style={styles.item}>
        <Text style={[styles.link, isActive && styles.active]}>
          {props.children}
        </Text>
      </View>
    </Link>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    padding: 14,
    height: '100%',
    backgroundColor: '#272727',
  },
  fill: {
    flex: 1,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  link: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#999',
  },
  active: {
    color: '#FFF',
  },
}));

