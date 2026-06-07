import {StyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';

import type {LegacyRef} from 'react';
import type {PressableProps, View} from 'react-native';

export interface ButtonIconProps extends PressableProps {
  icon: string,
  size?: number,
  vref?: LegacyRef<View>,
  state: typeof ButtonIconVariants.state[number],
}

export const ButtonIconVariants = {
  state: [
    'Default',
    'Hovered',
    'Focused',
    'Pressed',
    'Disabled',
  ],
} as const;

export function ButtonIcon({state, vref, ...props}: ButtonIconProps) {
  const {vstyles} = useVariants(ButtonIconVariants, {state}, styles);
  return (
    <Pressable ref={vref} style={vstyles.root} {...props}>
      {e => <>
        <Icon
          name={props.icon}
          size={props.size ?? 14}
          uniProps={(theme) => ({
            color: e.hovered ? theme.colors.accentForeground : theme.colors.mutedForeground,
          })}
        />
      </>}
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space1,
    borderRadius: theme.display.radius1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
  rootStateHovered: {
    opacity: 0.9,
  },
  rootStatePressed: {
    opacity: 0.8,
  },
  rootStateFocused: {
    borderColor: theme.colors.outline,
  },
  rootStateDisabled: {
    opacity: 0.4,
  },
}));
