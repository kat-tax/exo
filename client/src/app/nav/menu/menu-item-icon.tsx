import {Icon} from 'react-exo/icon';
import {Link} from '@react-navigation/native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {useLinkState} from './use-link-state';
import {MenuItemVariants} from './menu-item';
import type {MenuItemProps} from './menu-item';

export function MenuItemIcon(props: MenuItemProps) {
  const {ref, state, active, focused} = useLinkState(props);
  const {vstyles} = useVariants(MenuItemVariants, {state}, styles);

  return (
    <Link screen={props.path} params={{}} style={{width: '100%'}}>
      <View ref={ref} style={[
        styles.root,
        active && styles.rootStateActive,
        focused && styles.rootStateFocused,
      ]} aria-label={props.label}>
        {props.icon && Icon.New(props.icon, vstyles.icon())}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.display.space1,
    borderRadius: theme.display.radius1,
    borderColor: 'transparent',
    borderWidth: 1,
  },
  rootStateActive: {
    backgroundColor: theme.colors.secondary,
  },
  rootStateFocused: {
    borderColor: theme.colors.ring,
  },
  icon: {
    color: theme.colors.mutedForeground,
    size: __TOUCH__ ? 20 : 16,
  },
  iconStateActive: {
    color: theme.colors.foreground,
  },
}));
