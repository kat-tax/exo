import {useVariants} from 'react-exo/utils';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Icon} from 'react-exo/icon';

import type {ViewStyle, StyleProp} from 'react-native';

export interface BadgeProps {
  /** Text label to be displayed on the badge. */
  label: string,
  /** Visual mode of the badge, determining its stylistic appearance. */
  mode: typeof BadgeVariants.mode[number],
  /** Whether the icon should be displayed on the badge. */
  showIcon?: boolean,
  /** Whether the label should be displayed on the badge. */
  showLabel?: boolean,
  /** Optional icon element to be displayed on the badge. */
  icon?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const BadgeVariants = {
  mode: ['Default', 'Info', 'Error', 'Warning', 'Success'],
} as const;

/**
 * A small pressable component with a customizable label, optional icon, and indicator.
 * It supports various modes and states to represent different scenarios and interactions.
 */
export function Badge(props: BadgeProps) {
  const {mode} = props;
  const {vstyles} = useVariants(BadgeVariants, {mode}, styles);

  return (
    <View testID={props.testID ?? "5232:201"} style={[vstyles.root(), props.style]}>
      {props.showIcon && 
        Icon.New(props.icon, vstyles.icon())
      }
      {props.showLabel && 
        <Text testID="5232:189" style={vstyles.label()}>
          {props.label}
        </Text>
      }
    </View>
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
  rootModeInfo: {
    backgroundColor: theme.colors.info,
  },
  rootModeSuccess: {
    backgroundColor: theme.colors.success,
  },
  rootModeWarning: {
    backgroundColor: theme.colors.warning,
  },
  rootModeError: {
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
  labelModeInfo: {
    color: theme.colors.destructiveForeground,
  },
  labelModeSuccess: {
    color: theme.colors.destructiveForeground,
  },
  labelModeWarning: {
    color: theme.colors.destructiveForeground,
  },
  labelModeError: {
    color: theme.colors.destructiveForeground,
  },
  icon: {
    color: theme.colors.accentForeground,
    size: 12,
  },
  iconModeInfo: {
    color: theme.colors.destructiveForeground,
  },
  iconModeSuccess: {
    color: theme.colors.destructiveForeground,
  },
  iconModeWarning: {
    color: theme.colors.destructiveForeground,
  },
  iconModeError: {
    color: theme.colors.destructiveForeground,
  },
}));
