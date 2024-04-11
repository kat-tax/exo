import type {StyleProp, ViewStyle, ColorValue} from 'react-native';

export type SwitchComponent = (props: SwitchProps) => JSX.Element;

export interface SwitchProps {
  /**  The value of the switch. If true the switch will be turned on. Default = false */
  value?: boolean;
  /** Invoked with the new value when the value changes */
  onValueChange?: (value: boolean) => void;
  /** Whether the switch should be disabled */
  disabled?: boolean;
  /** The switch width */
  width?: number;
  /** The switch height */
  height?: number;
  /** The switch background color when it's turned on */
  onColor?: ColorValue;
  /** The switch background color when it's turned off */
  offColor?: ColorValue;
  /** The switch background color when it's disabled */
  disabledColor?: ColorValue;
  /** The switch's thumb color */
  thumbColor?: ColorValue;
  /** The switch's thumb size (width & height) */
  thumbSize?: number;
  /** The switch's thumb style */
  thumbStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  id?: string;
  label?: string;
  /** The identifier used for testing */
  testID?: string;
}
