import {useVariants} from 'react-exo/utils';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text, Pressable} from 'react-native';
import {Icon} from 'react-exo/icon';

import type {ViewStyle, StyleProp, PressableProps} from 'react-native';

export interface BadgeProps extends PressableProps {
  /** Text label to be displayed on the badge. */
  label: string,
  /** Visual mode of the badge, determining its stylistic appearance. */
  mode: typeof BadgeVariants.mode[number],
  /** Current state of the badge, affecting its styling based on user interaction or conditions. */
  state: typeof BadgeVariants.state[number],
  /** Whether the icon should be displayed on the badge. */
  showIcon?: boolean,
  /** Whether the indicator should be displayed on the badge. */
  showIndicator?: boolean,
  /** Whether the label should be displayed on the badge. */
  showLabel?: boolean,
  /** Optional icon element to be displayed on the badge. */
  icon?: React.ReactElement,
  /** Optional indicator element to be displayed on the badge. */
  indicator?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
}

export const BadgeVariants = {
  mode: ['Default', 'Info', 'Error', 'Warning', 'Success'],
  state: ['Default', 'Hovered', 'Pressed', 'Disabled', 'Focused'],
} as const;

/**
 * A small pressable component with a customizable label, optional icon, and indicator.
 * It supports various modes and states to represent different scenarios and interactions.
 */
export function Badge(props: BadgeProps) {
  const {mode, state} = props;
  const {vstyles} = useVariants(BadgeVariants, {mode, state}, styles);

  return (
    <Pressable testID={props.testID ?? "5232:201"} style={vstyles.root} {...props}>
      {e => <>
        {props.showIcon && 
          Icon.New(props.icon, vstyles.icon(e))
        }
        {props.showLabel && 
          <Text testID="5232:189" style={vstyles.label(e)}>
            {props.label}
          </Text>
        }
        {props.showIndicator && 
          <View testID="5235:308" style={vstyles.indicator(e)}>
            {props.showIndicator && 
              props.indicator
            }
          </View>
        }
      </>}
    </Pressable>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flexDirection: 'row',
    paddingTop: theme.display.space1,
    paddingLeft: theme.display.space2,
    paddingBottom: theme.display.space1,
    paddingRight: theme.display.space2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space1,
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: theme.colors.accent,
  },
  rootModeDefaultStateHovered: {
    opacity: 0.9,
  },
  rootModeDefaultStatePressed: {
    opacity: 0.8,
  },
  rootModeDefaultStateFocused: {
    borderColor: theme.colors.ring,
  },
  rootModeDefaultStateDisabled: {
    opacity: 0.4,
  },
  rootModeInfoStateDefault: {
    backgroundColor: theme.colors.info,
  },
  rootModeInfoStateHovered: {
    opacity: 0.9,
    backgroundColor: theme.colors.info,
  },
  rootModeInfoStatePressed: {
    opacity: 0.8,
    backgroundColor: theme.colors.info,
  },
  rootModeInfoStateFocused: {
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.info,
  },
  rootModeInfoStateDisabled: {
    opacity: 0.4,
    backgroundColor: theme.colors.info,
  },
  rootModeSuccessStateDefault: {
    backgroundColor: theme.colors.success,
  },
  rootModeSuccessStateHovered: {
    opacity: 0.9,
    backgroundColor: theme.colors.success,
  },
  rootModeSuccessStatePressed: {
    opacity: 0.8,
    backgroundColor: theme.colors.success,
  },
  rootModeSuccessStateFocused: {
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.success,
  },
  rootModeSuccessStateDisabled: {
    opacity: 0.4,
    backgroundColor: theme.colors.success,
  },
  rootModeWarningStateDefault: {
    backgroundColor: theme.colors.warning,
  },
  rootModeWarningStateHovered: {
    opacity: 0.9,
    backgroundColor: theme.colors.warning,
  },
  rootModeWarningStatePressed: {
    opacity: 0.8,
    backgroundColor: theme.colors.warning,
  },
  rootModeWarningStateFocused: {
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.warning,
  },
  rootModeWarningStateDisabled: {
    opacity: 0.4,
    backgroundColor: theme.colors.warning,
  },
  rootModeErrorStateDefault: {
    backgroundColor: theme.colors.destructive,
  },
  rootModeErrorStateHovered: {
    opacity: 0.9,
    backgroundColor: theme.colors.destructive,
  },
  rootModeErrorStatePressed: {
    opacity: 0.8,
    backgroundColor: theme.colors.destructive,
  },
  rootModeErrorStateFocused: {
    borderColor: theme.colors.ring,
    backgroundColor: theme.colors.destructive,
  },
  rootModeErrorStateDisabled: {
    opacity: 0.4,
    backgroundColor: theme.colors.destructive,
  },
  label: {
    color: theme.colors.accentForeground,
    fontFamily: 'Inter',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 14,
  },
  labelModeInfoStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  labelModeInfoStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  labelModeInfoStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  labelModeInfoStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  labelModeInfoStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  labelModeSuccessStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  labelModeSuccessStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  labelModeSuccessStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  labelModeSuccessStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  labelModeSuccessStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  labelModeWarningStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  labelModeWarningStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  labelModeWarningStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  labelModeWarningStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  labelModeWarningStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  labelModeErrorStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  labelModeErrorStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  labelModeErrorStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  labelModeErrorStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  labelModeErrorStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  status: {
    height: 16,
    minWidth: 16,
    minHeight: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
    borderTopLeftRadius: 9999,
    borderTopRightRadius: 9999,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.popoverForeground,
  },
  indicator: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    position: 'absolute',
    right: -5,
    top: -7,
  },
  icon: {
    color: theme.colors.accentForeground,
    size: 12,
  },
  iconModeInfoStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  iconModeInfoStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  iconModeInfoStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  iconModeInfoStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  iconModeInfoStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  iconModeSuccessStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  iconModeSuccessStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  iconModeSuccessStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  iconModeSuccessStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  iconModeSuccessStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  iconModeWarningStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  iconModeWarningStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  iconModeWarningStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  iconModeWarningStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  iconModeWarningStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  iconModeErrorStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  iconModeErrorStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  iconModeErrorStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  iconModeErrorStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  iconModeErrorStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
}));
