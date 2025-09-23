import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
// import {useLocation, useNavigate, Link} from 'react-exo/navigation';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {Link} from '@react-navigation/native';

import type {RootStackParamList} from 'app/navigation';

interface MenuItemProps extends React.PropsWithChildren {
  label: string,
  path: keyof RootStackParamList,
  icon: React.ReactElement,
  mode?: 'default' | 'action',
}

export function MenuItem(props: MenuItemProps) {
  //const nav = useNavigate();
  //const loc = useLocation();
  //const active = props.path === decodeURIComponent(loc.pathname);
  const nav = useNavigation();
  const route = useRoute();
  const active = route.name === props.path;
  const mode = props.mode ?? 'default';
  const action = mode === 'action';
  const {ref, focused} = useFocusable({
    focusKey: `menu@${props.path}`,
    //onFocus: () => nav(props.path),
  });

  return (
    <Link screen={props.path} params={{}} style={{width: '100%'}}>
      <View ref={ref} style={[
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
    width: '100%',
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

