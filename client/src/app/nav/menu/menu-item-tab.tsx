import {Icon} from 'react-exo/icon';
import {Link} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {useLinkState} from './use-link-state';
import {MenuItemVariants} from './menu-item';
import type {MenuItemProps} from './menu-item';

export function MenuItemTab(props: MenuItemProps) {
  const {ref, state} = useLinkState(props);
  const {vstyles} = useVariants(MenuItemVariants, {state}, styles);

  return (
    <Link screen={props.path} params={{}}>
      <View ref={ref} style={[
        styles.root,
        state === 'Focused' && styles.rootStateFocused,
      ]}>
        {props.icon && Icon.New(props.icon, vstyles.icon())}
        <Text style={[
          styles.label,
          state === 'Active' && styles.labelStateActive,
        ]}>
          {props.label}
        </Text>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    width: 60,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.display.space1,
    borderRadius: theme.display.radius1,
  },
  rootStateFocused: {
    borderColor: theme.colors.ring,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.mutedForeground,
    lineHeight: 24,
    fontSize: 9,
  },
  labelStateActive: {
    color: theme.colors.foreground,
  },
  icon: {
    size: 20,
    color: theme.colors.mutedForeground,
  },
  iconStateActive: {
    color: theme.colors.foreground,
  },
}));
