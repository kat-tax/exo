import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLocation, Link} from 'react-exo/navigation';
import {useScheme} from 'settings/hooks/useScheme';
import {isTouch} from 'app/utils/platform';

interface MenuItemProps extends React.PropsWithChildren {
  label: JSX.Element,
  path: string,
  icon?: string,
  color?: string,
  tabs?: boolean,
  sub?: boolean,
  striked?: boolean,
}

export function MenuItem(props: MenuItemProps) {
  const [scheme] = useScheme();
  const {pathname} = useLocation();
  const {styles, theme} = useStyles(stylesheet);
  const itemActive = props.path === decodeURIComponent(pathname);

  return (
    <Link to={props.path}>
      <View style={[
        styles.item,
        props.tabs && styles.itemTab,
        props.sub && styles.itemSub,
        itemActive && {
          backgroundColor: scheme === 'dark'
            ? 'rgba(255, 255, 255, 0.09)'
            : 'rgba(0, 0, 0, 0.07)'
        },
      ]}>
        {props.icon &&
          <Icon
            name={props.icon}
            size={props.tabs ? 20 : 16}
            color={props.color
              || (props.tabs
                ? theme.colors.foreground
                : theme.colors.mutedForeground)}
          />
        }
        {!props.tabs &&
          <Text
            style={[
              styles.tab,
              props.striked && styles.tabStriked,
            ]}>
            {props.label}
          </Text>
        }
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
  },
  itemTab: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.display.space2,
  },
  itemSub: {
    marginLeft: 8,
  },
  tab: {
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
  tabStriked: {
    textDecorationLine: 'line-through',
  },
}));

