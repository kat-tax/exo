import {View, Text} from 'react-native';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useNavigate, Link} from 'react-exo/navigation';

interface MenuItemProps extends React.PropsWithChildren {
  label: string,
  path: string,
  icon?: React.ReactNode,
  active: boolean,
}

export function MenuItem({icon, path, label, active}: MenuItemProps) {
  const nav = useNavigate();
  const {styles} = useStyles(stylesheet);
  const {ref, focused} = useFocusable({
    focusKey: `menu@${path}`,
    onFocus: () => nav(path),
  });

  return (
    <Link ref={ref} to={path}>
      <View style={[
        styles.item,
        active && styles.active,
        focused && styles.focus,
      ]}>
        {icon}
        <Text style={styles.label}>
          {label}
        </Text>
      </View>
    </Link>
  );
}

const stylesheet = createStyleSheet(theme => ({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.display.radius1,
    paddingHorizontal: theme.display.space2,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  active: {
    backgroundColor: theme.colors.card,
  },
  focus: {
    borderColor: theme.colors.outline,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.secondaryForeground,
    lineHeight: 24,
    fontSize: 11,
    ...__TOUCH__ && {
      marginLeft: theme.display.space2,
      lineHeight: 40,
      fontSize: 13,
    },
  },
}));

