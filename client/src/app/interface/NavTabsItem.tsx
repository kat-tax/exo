import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLocation, Link} from 'react-exo/navigation';
import {isTouch} from 'app/utils/platform';

interface NavTabsItemProps extends React.PropsWithChildren {
  label: JSX.Element,
  path: string,
  icon: string,
}

export function NavTabsItem(props: NavTabsItemProps) {
  const {pathname} = useLocation();
  const {styles, theme} = useStyles(stylesheet);
  const isActive = props.path === decodeURIComponent(pathname);

  return (
    <Link to={props.path}>
      <View style={[
        styles.item,
        isActive && styles.itemActive,
      ]}>
        {props.icon &&
          <Icon
            name={props.icon}
            color={theme.colors.foreground}
            size={20}
          />
        }
        <Text style={styles.label}>
          {props.label}
        </Text>
      </View>
    </Link>
  );
}

const stylesheet = createStyleSheet(theme => ({
  item: {
    width: 44,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.display.radius1,
    padding: theme.display.space2,
  },
  itemAction: {
    paddingHorizontal: theme.display.space1,
    paddingVertical: theme.display.space1,
  },
  itemActive: {
    backgroundColor: theme.colors.card,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.secondaryForeground,
    lineHeight: 24,
    fontSize: 11,
    ...isTouch() && {
      marginLeft: theme.display.space2,
      lineHeight: 32,
      fontSize: 12,
    },
  },
}));

