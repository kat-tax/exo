import {useVariants} from 'react-exo/utils';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';

import type {PressableProps} from 'react-native';

export interface TextButtonProps extends PressableProps {
  label: string,
  state: typeof TextButtonVariants.state[number],
}

export const TextButtonVariants = {
  state: [
    'Default',
    'Hovered',
    'Focused',
    'Pressed',
    'Disabled',
  ],
} as const;

export function TextButton({state, ...props}: TextButtonProps) {
  const {styles} = useStyles(stylesheet);
  const {vstyles} = useVariants(TextButtonVariants, {state}, styles);
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
