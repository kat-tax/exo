import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';

import type {PressableProps} from 'react-native';

export interface IconButtonProps extends PressableProps {
  icon: string,
  state: typeof IconButtonVariants.state[number],
}

export const IconButtonVariants = {
  state: [
    'Default',
    'Hovered',
    'Focused',
    'Pressed',
    'Disabled',
  ],
} as const;

export function IconButton({state, ...props}: IconButtonProps) {
  const {styles, theme} = useStyles(stylesheet);
  const {vstyles} = useVariants(IconButtonVariants, {state}, styles);
  return (
    <Pressable style={vstyles.root} {...props}>
      {e => <>
        <Icon
          name={props.icon}
          color={e.hovered ? theme.colors.accentForeground : theme.colors.mutedForeground}
          size={14}
        />
      </>}
    </Pressable>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
    borderColor: theme.colors.ring,
  },
  rootStateDisabled: {
    opacity: 0.4,
  },
}));
