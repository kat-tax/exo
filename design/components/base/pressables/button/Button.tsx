import {useVariants} from 'react-exo/utils';
import {StyleSheet} from 'react-native-unistyles';
import {Text, Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';

import type {ViewStyle, StyleProp, PressableProps} from 'react-native';

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
  icon?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
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
  const {vstyles} = useVariants(ButtonVariants, {mode, state}, styles);

  return (
    <Pressable testID={props.testID ?? "2028:395"} style={vstyles.root} {...props}>
      {e => <>
        {props.showIcon && 
          Icon.New(props.icon, vstyles.icon(e))
        }
        <Text testID="2028:398" style={vstyles.label(e)}>
          {props.label}
        </Text>
      </>}
    </Pressable>
  );
}

const styles = StyleSheet.create(theme => ({
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
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  rootModePrimaryStateHovered: {
    flexShrink: 0,
    opacity: 0.9,
  },
  rootModePrimaryStatePressed: {
    flexShrink: 0,
    opacity: 0.8,
  },
  rootModePrimaryStateFocused: {
    flexShrink: 0,
    borderColor: theme.colors.accent,
  },
  rootModePrimaryStateDisabled: {
    flexShrink: 0,
    borderColor: theme.colors.border,
    opacity: 0.4,
  },
  rootModeSecondaryStateDefault: {
    flexShrink: 0,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.secondary,
  },
  rootModeSecondaryStateHovered: {
    flexShrink: 0,
    borderColor: theme.colors.border,
    opacity: 0.9,
    backgroundColor: theme.colors.secondary,
  },
  rootModeSecondaryStatePressed: {
    flexShrink: 0,
    borderColor: theme.colors.border,
    opacity: 0.8,
    backgroundColor: theme.colors.secondary,
  },
  rootModeSecondaryStateFocused: {
    flexShrink: 0,
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.secondary,
  },
  rootModeSecondaryStateDisabled: {
    flexShrink: 0,
    borderColor: theme.colors.border,
    opacity: 0.4,
    backgroundColor: theme.colors.secondary,
  },
  rootModeDestructiveStateDefault: {
    flexShrink: 0,
    borderColor: theme.colors.destructive,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStateHovered: {
    flexShrink: 0,
    borderColor: theme.colors.destructive,
    opacity: 0.9,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStatePressed: {
    flexShrink: 0,
    borderColor: theme.colors.destructive,
    opacity: 0.8,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStateFocused: {
    flexShrink: 0,
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.destructive,
  },
  rootModeDestructiveStateDisabled: {
    flexShrink: 0,
    borderColor: theme.colors.destructive,
    opacity: 0.4,
    backgroundColor: theme.colors.destructive,
  },
  rootModeTextStateDefault: {
    backgroundColor: undefined,
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  rootModeTextStateHovered: {
    backgroundColor: undefined,
    flexShrink: 0,
    borderColor: 'rgba(0, 0, 0, 0)',
    opacity: 0.9,
  },
  rootModeTextStatePressed: {
    backgroundColor: undefined,
    flexShrink: 0,
    borderColor: 'rgba(0, 0, 0, 0)',
    opacity: 0.8,
  },
  rootModeTextStateFocused: {
    backgroundColor: undefined,
    flexShrink: 0,
    borderColor: theme.colors.ring,
  },
  rootModeTextStateDisabled: {
    backgroundColor: undefined,
    flexShrink: 0,
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
  icon: {
    color: theme.colors.primaryForeground,
    size: 16,
  },
  iconModeSecondaryStateDefault: {
    color: theme.colors.secondaryForeground,
  },
  iconModeSecondaryStateHovered: {
    color: theme.colors.secondaryForeground,
  },
  iconModeSecondaryStatePressed: {
    color: theme.colors.secondaryForeground,
  },
  iconModeSecondaryStateFocused: {
    color: theme.colors.secondaryForeground,
  },
  iconModeSecondaryStateDisabled: {
    color: theme.colors.secondaryForeground,
  },
  iconModeDestructiveStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  iconModeDestructiveStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  iconModeDestructiveStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  iconModeDestructiveStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  iconModeDestructiveStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  iconModeTextStateDefault: {
    color: theme.colors.secondaryForeground,
  },
  iconModeTextStateHovered: {
    color: theme.colors.secondaryForeground,
  },
  iconModeTextStatePressed: {
    color: theme.colors.secondaryForeground,
  },
  iconModeTextStateFocused: {
    color: theme.colors.secondaryForeground,
  },
  iconModeTextStateDisabled: {
    color: theme.colors.secondaryForeground,
  },
}));
