import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useLocation, useNavigate, Link} from 'react-exo/navigation';

interface MenuItemProps extends React.PropsWithChildren {
  label: string,
  path: string,
  icon: React.ReactElement,
  mode?: 'default' | 'action',
}

export function MenuItem(props: MenuItemProps) {
  const nav = useNavigate();
  const loc = useLocation();
  const mode = props.mode ?? 'default';
  const action = mode === 'action';
  const active = props.path === decodeURIComponent(loc.pathname);
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.path}`,
    onFocus: () => nav(props.path),
  });

  return (
    <Link ref={ref} to={props.path}>
      <View style={[
        styles.item,
        action && styles.action,
        active && styles.active,
        focused && styles.focus,
      ]}>
        {props.icon && Icon.New(props.icon, {
          size: action && !__TOUCH__ ? 14 : 18,
          uniProps: (theme: any) => ({
            color: action && active
              ? theme.colors.foreground
              : theme.colors.mutedForeground,
          }),
        })}
        {!action && (
          <Text style={styles.label}>
            {props.label}
          </Text>
        )}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create((theme) => ({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.display.radius1,
    paddingHorizontal: theme.display.space2,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  action: {
    paddingVertical: theme.display.space1,
    paddingHorizontal: theme.display.space1,
  },
  active: {
    backgroundColor: theme.colors.secondary,
  },
  focus: {
    borderColor: theme.colors.ring,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.secondaryForeground,
    fontSize: theme.font.size,
    lineHeight: theme.font.headerHeight,
    letterSpacing: theme.font.spacing,
    ...__TOUCH__ && {
      marginLeft: theme.display.space2,
      lineHeight: 40,
      fontSize: 14,
    },
  },
}));

