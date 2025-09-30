import {Icon} from 'react-exo/icon';
import {Link} from '@react-navigation/native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {createElement} from 'react';
import {useLinkState} from 'app/nav/hooks/use-link-state';
import type {MenuItemProps} from 'app/nav/types';

export function MenuItemIcon(props: MenuItemProps) {
  const {ref, active, focused} = useLinkState(props);

  return (
    <Link screen={props.name} params={{}} style={{width: '100%'}}>
      <View aria-label={props.options?.title} ref={ref} style={[
        styles.root,
        active && styles.active,
        focused && styles.focused,
      ]}>
        {props.options?.icon && createElement(Icon, {
          name: props.options?.icon,
          size: __TOUCH__ ? 20 : 16,
          uniProps: (theme) => ({
            color: active
              ? theme.colors.foreground
              : theme.colors.mutedForeground,
          }),
        })}
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
  active: {
    backgroundColor: theme.colors.secondary,
  },
  focused: {
    borderColor: theme.colors.ring,
  },
}));
