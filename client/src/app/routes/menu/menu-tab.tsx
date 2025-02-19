import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Link} from 'react-exo/navigation';

interface MenuTabProps extends React.PropsWithChildren {
  label: string,
  path: string,
  icon: React.ReactNode,
  active: boolean,
}

export function MenuTab(props: MenuTabProps) {
  const {styles} = useStyles(stylesheet);
  const isActive = props.active;

  return (
    <Link to={props.path}>
      <View style={styles.item}>
        <View style={styles.icon}>
          {props.icon}
        </View>
        <Text style={[styles.label, isActive && styles.active]}>
          {props.label}
        </Text>
      </View>
    </Link>
  );
}

const stylesheet = createStyleSheet(theme => ({
  item: {
    width: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.display.space1,
    borderRadius: theme.display.radius1,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.mutedForeground,
    lineHeight: 24,
    fontSize: 9,
  },
  active: {
    color: theme.colors.foreground,
  },
  icon: {
    pointerEvents: 'none',
  },
}));

