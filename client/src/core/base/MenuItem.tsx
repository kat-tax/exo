import {View, Text} from 'react-native';
import {useLocation, Link} from 'react-exo/navigation';
import {useMemo, cloneElement} from 'react';
import {useScheme} from 'settings/hooks/useScheme';
import {useStyles, createStyleSheet} from 'design/styles';
import {isTouch} from 'core/utils/platform';

interface MenuItemProps extends React.PropsWithChildren {
  path: string,
  icon?: JSX.Element,
  tab?: boolean,
  sub?: boolean,
}

export function MenuItem(props: MenuItemProps) {
  const {path, icon, tab, sub} = props;
  const {styles, theme} = useStyles(stylesheet);
  const [scheme] = useScheme();
  const {pathname} = useLocation();

  const active = path === decodeURIComponent(pathname);
  const vstyles = useMemo(() => ({
    root: [
      styles.item,
      tab && styles.tab,
      sub && styles.sub,
      active && {
        backgroundColor: 
          scheme === 'dark'
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(0, 0, 0, 0.07)',
      },
    ],
  }), [tab, sub, active, scheme]);

  return (
    <Link to={path}>
      <View style={vstyles.root}>
        {icon && cloneElement(icon, {
          color: theme.colors.primary,
          size: tab ? 20 : 16,
        })}
        {tab ? null : (
          <Text style={styles.link}>
            {props.children}
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
  sub: {
    marginLeft: 8,
  },
  tab: {
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  link: {
    fontSize: 11,
    lineHeight: 24,
    marginLeft: 4,
    color: theme.colors.secondaryForeground,
    ...isTouch() && {
      fontSize: 12,
      marginLeft: 8,
      lineHeight: 36,
    },
  },
}));

