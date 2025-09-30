import {Icon} from 'react-exo/icon';
import {Link} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {createElement} from 'react';
import {useLinkState} from './use-link-state';
import type {MenuItemProps} from './use-link-state';

export function MenuItemTab(props: MenuItemProps) {
  const {ref, active, focused} = useLinkState(props);

  return (
    <Link screen={props.name} params={{}}>
      <View ref={ref} style={[
        styles.root,
        focused && styles.focused,
      ]}>
        {props.options?.icon && createElement(Icon, {
          name: props.options?.icon,
          size: 20,
          uniProps: (theme) => ({
            color: active
              ? theme.colors.foreground
              : theme.colors.mutedForeground,
          }),
        })}
        <Text style={[
          styles.label,
          active && styles.labelActive,
        ]}>
          {props.options?.title}
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
  focused: {
    borderColor: theme.colors.ring,
  },
  label: {
    userSelect: 'none',
    marginHorizontal: theme.display.space1,
    color: theme.colors.mutedForeground,
    lineHeight: 24,
    fontSize: 9,
  },
  labelActive: {
    color: theme.colors.foreground,
  },
}));
