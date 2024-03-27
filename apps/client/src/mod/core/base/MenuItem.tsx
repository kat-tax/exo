import {View, Text} from 'react-native';
import {useLocation, Link} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'styles';

export interface MenuItemProps {
  path: string;
  children: React.ReactNode;
}

export function MenuItem(props: MenuItemProps) {
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

const stylesheet = createStyleSheet(theme => ({
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
