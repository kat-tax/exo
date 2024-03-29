import type {StyleProp, ViewStyle, ColorValue} from 'react-native';

export type SwitchComponent = (props: SwitchProps) => JSX.Element;

export interface SwitchProps {
  /**
   * The value of the switch. If true the switch will be turned on. Default value is false
   */
  value?: boolean;
  /**
   * Invoked with the new value when the value changes
   */
  onValueChange?: (value: boolean) => void;
  /**
   * Whether the switch should be disabled
   */
  disabled?: boolean;
  /**
   * The Switch width
   */
  width?: number;
  /**
   * The Switch height
   */
  height?: number;
  /**
   * The Switch background color when it's turned on
   */
  onColor?: ColorValue;
  /**
   * The Switch background color when it's turned off
   */
  offColor?: ColorValue;
  /**
   * The Switch background color when it's disabled
   */
  disabledColor?: ColorValue;
  /**
   * The Switch's thumb color
   */
  thumbColor?: ColorValue;
  /**
   * The Switch's thumb size (width & height)
   */
  thumbSize?: number;
  /**
   * The Switch's thumb style
   */
  thumbStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  id?: string;
  label?: string;
  /**
   * The switch's test identifier
   */
  testID?: string;
}
