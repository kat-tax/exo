import {cloneElement} from 'react';
import {View, Text} from 'react-native';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLocation, useNavigate, Link} from 'react-exo/navigation';

interface MenuItemProps extends React.PropsWithChildren {
  path: string,
  label: string,
  icon?: React.ReactNode,
}

export function MenuItem(props: MenuItemProps) {
  const nav = useNavigate();
  const loc = useLocation();
  const active = props.path === decodeURIComponent(loc.pathname);
  const {styles, theme} = useStyles(stylesheet);
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.path}`,
    onFocus: () => nav(props.path),
  });

  return (
    <Link ref={ref} to={props.path}>
      <View style={[
        styles.item,
        active && styles.active,
        focused && styles.focus,
      ]}>
        {props.icon &&
          cloneElement(props.icon as React.ReactElement, {
            size: 16,
            color: active
              ? theme.colors.foreground
              : theme.colors.mutedForeground,
          })
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

