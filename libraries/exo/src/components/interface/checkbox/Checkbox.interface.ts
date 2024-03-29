import type {StyleProp, ViewStyle, TextStyle, TextProps} from 'react-native';

export type CheckboxComponent = (props: CheckboxProps) => JSX.Element;

export interface CheckboxProps {
  /**
   * The value of the Checkbox. If true the switch will be turned on. Default value is false.
   */
  value?: boolean;
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: (value: boolean) => void;
  indeterminate?: boolean;
  id?: string;
  icon?: React.ReactNode;
  /**
   * Whether the checkbox should be disabled
   */
  disabled?: boolean;
  /**
   * The Checkbox color
   */
  color?: string;
  /**
   * alternative Checkbox outline style
   */
  outline?: boolean;
  /**
   * The size of the checkbox. affect both width and height
   */
  size?: number;
  /**
   * The Checkbox border radius
   */
  borderRadius?: number;
  /**
   * The icon asset to use for the selected indication (accept only local assets)
   */
  selectedIcon?: number;
  /**
   * The selected icon color
   */
  iconColor?: string;
  /**
   * The label of the checkbox
   */
  label?: string;
  /**
   * The style of the label
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Props that will be passed to the checkbox Text label.
   */
  labelProps?: Omit<TextProps, 'style'>;
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Additional styling for checkbox and label container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * The checkbox's test identifier
   */
  testID?: string;
}
