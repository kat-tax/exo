import {cloneElement} from 'react';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLocation, Link} from 'react-exo/navigation';
import {useScheme} from 'settings/hooks/useScheme';
import {isTouch} from 'app/utils/platform';

interface MenuItemProps extends React.PropsWithChildren {
  label: JSX.Element,
  path: string,
  icon?: JSX.Element,
  tab?: boolean,
  sub?: boolean,
  striked?: boolean,
}

export function MenuItem(props: MenuItemProps) {
  const [scheme] = useScheme();
  const {pathname} = useLocation();
  const {styles, theme} = useStyles(stylesheet);
  const itemActive = props.path === decodeURIComponent(pathname);
  const isDarkMode = scheme === 'dark';
  const backgroundColor = isDarkMode
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(0, 0, 0, 0.07)';

  return (
    <Link to={props.path}>
      <View style={[
        styles.item,
        props.tab && styles.itemTab,
        props.sub && styles.itemSub,
        itemActive && {backgroundColor},
      ]}>
        {props.icon && cloneElement(props.icon, {
          size: props.tab ? 20 : 16,
          color: theme.colors.primary,
        })}
        {props.tab ? null : (
          <Text style={[
            styles.tab,
            props.striked && styles.tabStriked,
          ]}>
            {props.label}
          </Text>
        )}
      </View>
    </Link>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.secondary,
  },
  rootTabs: {
    flexDirection: 'row',
  },
  item: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
  },
  itemTab: {
    width: 40,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSub: {
    marginLeft: 8,
  },
  tab: {
    marginHorizontal: 4,
    lineHeight: 24,
    fontSize: 11,
    color: theme.colors.secondaryForeground,
    ...isTouch() && {
      marginLeft: 8,
      lineHeight: 36,
      fontSize: 12,
    },
  },
  tabStriked: {
    textDecorationLine: 'line-through',
  },
}));

