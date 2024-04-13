import type {StyleProp, ViewStyle, TextStyle, TextProps} from 'react-native';

export type CheckboxComponent = (props: CheckboxProps) => JSX.Element;

export interface CheckboxProps {
  /** Invoked with the new value when the value changes. */
  onValueChange?: (value: boolean) => void,
  /** The value of the checkbox. */
  value?: boolean,
  /** The identifier for the checkbox */
  id?: string,
  /** The label of the checkbox */
  label?: string,
  /** Whether the checkbox should be disabled */
  disabled?: boolean,
  /** Whether the checkbox is an indeterminate state */
  indeterminate?: boolean,
  /** The checkbox border radius */
  borderRadius?: number,
  /** The icon that will appear when the checkbox is checked */
  icon?: React.ReactNode,
  /** The icon asset to use for the selected indication (accept only local assets) */
  selectedIcon?: number,
  /** If true, the checkbox will have the alternative outline style */
  outline?: boolean,
  /** The size of the checkbox. affect both width and height */
  size?: number,
  /** The checkbox color */
  color?: string,
  /** The selected icon color */
  iconColor?: string,
  /** Additional styling */
  style?: StyleProp<ViewStyle>,
  /** The style of the label */
  labelStyle?: StyleProp<TextStyle>,
  /** Props that will be passed to the checkbox label. */
  labelProps?: Omit<TextProps, 'style'>,
  /** Additional styling for checkbox and label container */
  containerStyle?: StyleProp<ViewStyle>,
  /** The identifier used for testing */
  testID?: string,
}
