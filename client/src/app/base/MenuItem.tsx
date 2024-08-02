import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLocation, Link} from 'react-exo/navigation';
import {isTouch} from 'app/utils/platform';

interface MenuItemProps extends React.PropsWithChildren {
  label: JSX.Element,
  path: string,
  icon?: string,
  color?: string,
  mode?: 'default' | 'subitem' | 'tab' | 'action',
}

export function MenuItem(props: MenuItemProps) {
  const {styles, theme} = useStyles(stylesheet);
  const {pathname} = useLocation();

  const mode = props.mode ?? 'default';
  const isTab = mode === 'tab';
  const isDefault = mode === 'default';
  const isSubitem = mode === 'subitem';
  const isAction = mode === 'action';
  const isActive = props.path === decodeURIComponent(pathname);

  return (
    <Link to={props.path}>
      <View style={[
        styles.item,
        isTab && styles.itemTab,
        isAction && styles.itemAction,
        isActive && styles.itemActive,
      ]}>
        {props.icon &&
          <Icon
            name={props.icon}
            size={isAction ? 14 : isTab ? 20 : 16}
            color={props.color
              || ((isTab || (isAction && isActive))
                ? theme.colors.foreground
                : theme.colors.mutedForeground)}
          />
        }
        {(isDefault || isSubitem) &&
          <Text style={styles.label}>
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

