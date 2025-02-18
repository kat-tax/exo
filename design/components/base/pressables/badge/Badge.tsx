import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useVariants, createIcon} from 'react-exo/utils';
import {View, Text, Pressable} from 'react-native';

import type {PressableProps} from 'react-native';

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
  icon?: JSX.Element,
  /** Optional indicator element to be displayed on the badge. */
  indicator?: JSX.Element,
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
  const {styles} = useStyles(stylesheet);
  const {vstyles} = useVariants(BadgeVariants, {mode, state}, styles);

  return (
    <Pressable style={vstyles.root} testID={props.testID ?? "5232:201"} {...props}>
      {e => <>
        {props.showIcon && 
          createIcon(props.icon, vstyles.phPlaceholder(e))
        }
        {props.showLabel && 
          <Text style={vstyles.label(e)} testID="5232:189">
            {props.label}
          </Text>
        }
        {props.showIndicator && 
          <View style={vstyles.indicator(e)} testID="5235:308">
            {props.showIndicator && 
              props.indicator
            }
          </View>
        }
      </>}
    </Pressable>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
    backgroundColor: theme.colors.accent,
  },
  rootModeDefaultStateHovered: {
    opacity: 0.9,
  },
  rootModeDefaultStatePressed: {
    opacity: 0.8,
  },
  rootModeDefaultStateFocused: {
    borderWidth: 1,
    borderStyle: 'solid',
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
    borderWidth: 1,
    borderStyle: 'solid',
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
    borderWidth: 1,
    borderStyle: 'solid',
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
    borderWidth: 1,
    borderStyle: 'solid',
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
    borderWidth: 1,
    borderStyle: 'solid',
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
  phPlaceholder: {
    color: theme.colors.accentForeground,
    size: 12,
  },
  phPlaceholderModeInfoStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeInfoStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeInfoStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeInfoStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeInfoStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeSuccessStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeSuccessStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeSuccessStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeSuccessStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeSuccessStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeWarningStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeWarningStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeWarningStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeWarningStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeWarningStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeErrorStateDefault: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeErrorStateHovered: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeErrorStatePressed: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeErrorStateFocused: {
    color: theme.colors.destructiveForeground,
  },
  phPlaceholderModeErrorStateDisabled: {
    color: theme.colors.destructiveForeground,
  },
}));
