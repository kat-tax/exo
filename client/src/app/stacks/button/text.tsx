import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {Text, Pressable} from 'react-native';

import type {PressableProps} from 'react-native';

export interface ButtonTextProps extends PressableProps {
  label: string,
  state: typeof ButtonTextVariants.state[number],
}

export const ButtonTextVariants = {
  state: [
    'Default',
    'Hovered',
    'Focused',
    'Pressed',
    'Disabled',
  ],
} as const;

export function ButtonText({state, ...props}: ButtonTextProps) {
  const {styles} = useStyles(stylesheet);
  const {vstyles} = useVariants(ButtonTextVariants, {state}, styles);
  return (
    <Pressable style={vstyles.root} {...props}>
      {e => <>
        <Text style={vstyles.label(e)}>
          {props.label}
        </Text>
      </>}
    </Pressable>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flexDirection: 'row',
    paddingHorizontal: theme.display.space1,
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
    borderColor: theme.colors.ring,
  },
  rootStateDisabled: {
    opacity: 0.4,
  },
  label: {
    color: theme.colors.accentForeground,
    fontFamily: theme.font.family,
    fontSize: 11,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
  },
}));
