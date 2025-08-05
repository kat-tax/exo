import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {useLocation, useNavigate, Link} from 'react-exo/navigation';
import {createIcon} from 'react-exo/utils';

interface MenuItemProps extends React.PropsWithChildren {
  label: string,
  path: string,
  icon: React.ReactElement,
}

export function MenuItem(props: MenuItemProps) {
  const nav = useNavigate();
  const loc = useLocation();
  const active = props.path === decodeURIComponent(loc.pathname);
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
        {props.icon && createIcon(props.icon, {
          uniProps: (theme: any) => ({
            color: theme.colors.mutedForeground,
          }),
          size: 18,
        })}
        <Text style={styles.label}>
          {props.label}
        </Text>
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
  active: {
    backgroundColor: theme.colors.secondary,
  },
  focus: {
    borderColor: theme.colors.outline,
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

