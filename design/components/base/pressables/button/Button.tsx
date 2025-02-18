import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useVariants, createIcon} from 'react-exo/utils';
import {Text, Pressable} from 'react-native';

import type {PressableProps} from 'react-native';

export interface ButtonProps extends PressableProps {
  /** The text label displayed on the button. */
  label: string,
  /** Determines the button's style mode. */
  mode: typeof ButtonVariants.mode[number],
  /** Represents the button's current interaction state. */
  state: typeof ButtonVariants.state[number],
  /** Whether to display an icon button. */
  showIcon?: boolean,
  /** The icon element to display if showIcon is true. */
  icon?: JSX.Element,
}

export const ButtonVariants = {
  mode: ['Primary', 'Secondary', 'Destructive', 'Text'],
  state: ['Default', 'Hovered', 'Pressed', 'Focused', 'Disabled'],
} as const;

/**
 * A button that extends the Pressable component.
 * It can be styled according to various modes and states.
 */
export function Button(props: ButtonProps) {
  const {mode, state} = props;
  const {styles} = useStyles(stylesheet);
  const {vstyles} = useVariants(ButtonVariants, {mode, state}, styles);

  return (
    <Pressable style={vstyles.root} testID={props.testID ?? "2028:395"} {...props}>
      {e => <>
        {props.showIcon && 
          createIcon(props.icon, vstyles.phPlaceholder(e))
        }
        <Text style={vstyles.label(e)} testID="2028:398">
          {props.label}
        </Text>
      </>}
    </Pressable>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flexDirection: 'row',
    height: 36,
    paddingTop: 0,
    paddingLeft: theme.display.space4,
    paddingBottom: 0,
    paddingRight: theme.display.space4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space2,
    flexShrink: 0,
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  rootModePrimaryStateHovered: {
    opacity: 0.9,
  },
  rootModePrimaryStatePressed: {
    opacity: 0.8,
  },
  rootModePrimaryStateFocused: {
    borderColor: theme.colors.accent,
  },
  rootModePrimaryStateDisabled: {
    borderColor: theme.colors.border,
    opacity: 0.4,
  },
  rootModeSecondaryStateDefault: {
    backgroundColor: 'unset' as any,
    borderColor: theme.colors.border,
  },
  rootModeSecondaryStateHovered: {
    borderColor: theme.colors.border,
    opacity: 0.9,
    backgroundColor: theme.colors.secondary,
  },
  rootModeSecondaryStatePressed: {
    borderColor: theme.colors.border,
    opacity: 0.8,
    backgroundColor: theme.colors.secondary,
  },
  rootModeSecondaryStateFocused: {
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.secondary,
  },
  rootModeSecondaryStateDisabled: {
    backgroundColor: 'unset' as any,
    borderColor: theme.colors.border,
    opacity: 0.4,
  },
  rootModeDestructiveStateDefault: {
    borderColor: theme.colors.destructive,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStateHovered: {
    borderColor: theme.colors.destructive,
    opacity: 0.9,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStatePressed: {
    borderColor: theme.colors.destructive,
    opacity: 0.8,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStateFocused: {
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStateDisabled: {
    borderColor: theme.colors.destructive,
    opacity: 0.4,
    backgroundColor: theme.colors.destructive,
  },
  rootModeTextStateDefault: {
    backgroundColor: 'unset' as any,
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  rootModeTextStateHovered: {
    backgroundColor: 'unset' as any,
    borderColor: 'rgba(0, 0, 0, 0)',
    opacity: 0.9,
  },
  rootModeTextStatePressed: {
    backgroundColor: 'unset' as any,
    borderColor: 'rgba(0, 0, 0, 0)',
    opacity: 0.8,
  },
  rootModeTextStateFocused: {
    backgroundColor: 'unset' as any,
    borderColor: theme.colors.ring,
  },
  rootModeTextStateDisabled: {
    backgroundColor: 'unset' as any,
    borderColor: 'rgba(0, 0, 0, 0)',
    opacity: 0.4,
  },
  label: {
    color: theme.colors.primaryForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontStyle: 'normal',
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
  },
  labelModeSecondaryStateDefault: {
    color: theme.colors.secondaryForeground,
  },
  labelModeSecondaryStateHovered: {
    color: theme.colors.secondaryForeground,
  },
  labelModeSecondaryStatePressed: {
    color: theme.colors.secondaryForeground,
  },
  labelModeSecondaryStateFocused: {
    color: theme.colors.secondaryForeground,
  },
  labelModeSecondaryStateDisabled: {
    color: theme.colors.secondaryForeground,
  },
  labelModeDestructiveStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  labelModeDestructiveStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  labelModeDestructiveStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  labelModeDestructiveStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  labelModeDestructiveStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  labelModeTextStateDefault: {
    color: theme.colors.secondaryForeground,
  },
  labelModeTextStateHovered: {
    color: theme.colors.secondaryForeground,
  },
  labelModeTextStatePressed: {
    color: theme.colors.secondaryForeground,
  },
  labelModeTextStateFocused: {
    color: theme.colors.secondaryForeground,
  },
  labelModeTextStateDisabled: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholder: {
    color: theme.colors.primaryForeground,
    size: 16,
  },
  phPlaceholderModeSecondaryStateDefault: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeSecondaryStateHovered: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeSecondaryStatePressed: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeSecondaryStateFocused: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeSecondaryStateDisabled: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeDestructiveStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeDestructiveStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeDestructiveStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeDestructiveStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeDestructiveStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeTextStateDefault: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeTextStateHovered: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeTextStatePressed: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeTextStateFocused: {
    color: theme.colors.secondaryForeground,
  },
  phPlaceholderModeTextStateDisabled: {
    color: theme.colors.secondaryForeground,
  },
}));
