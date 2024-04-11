import type * as RN from 'react-native';

export interface PickerProps<T = ItemValue> extends RN.ViewProps {
  /**
   * Callback for when an item is selected. This is called with the following parameters:
   * - `itemValue` - the `value` prop of the item that was selected
   * - `itemIndex` - the index of the selected item in this picker
   */
  onValueChange?: (itemValue: T, itemIndex: number) => void,
  /**
   * Called when picker is focused
   * @platform Android
   */
  onFocus?: (e: RN.NativeSyntheticEvent<RN.TargetedEvent>) => void,
  /**
   * Called when picker is blurred
   * @platform Android
   */
  onBlur?: (e: RN.NativeSyntheticEvent<RN.TargetedEvent>) => void,
  /**
   * Value matching value of one of the items. Can be a string or an integer.
   */
  selectedValue?: T,
  /**
   * Placeholder string for this picker, used on Windows if no item has been selected.
   * @platform Windows
   */
  placeholder?: string,
  /**
   * On Android & iOS, used to truncate the text with an ellipsis after computing the text layout, including line wrapping,
   * such that the total number of lines does not exceed this number. Default = 1
   * @platform Android, iOS
   */
  numberOfLines?: number,
  /**
   * Prompt string for this picker, used on Android in dialog mode as the title of the dialog.
   * @platform Android
   */
  prompt?: string,
  /**
   * If set to false, the picker will be disabled.
   * @platform android
   */
  enabled?: boolean,
  /**
   * On Android, specifies how to display the selection items when the user taps on the picker:
   * - `dialog` - Show a modal dialog. This is the default.
   * - `dropdown` - Shows a dropdown anchored to the picker view
   * @platform android
   */
  mode?: 'dialog' | 'dropdown',
  /**
  * Color to apply to the selection indicator.
  * @platform iOS
  */
  selectionColor?: RN.ColorValue,
  /**
   * Color of arrow for spinner dropdown in hexadecimal format
   * @platform Android
   */
  dropdownIconColor?: number | RN.ColorValue,
  /**
   * Ripple color of spinner's arrow
   * @platform Android
   */
  dropdownIconRippleColor?: number | RN.ColorValue,
  /**
   * Style to apply to the picker root.
   */
  style?: RN.StyleProp<RN.TextStyle>,
  /**
   * Style to apply to each of the item labels.
   * @platform iOS
   */
  itemStyle?: RN.StyleProp<RN.TextStyle>,
  /**
   * The string used for the accessibility label. Will be read once focused on the picker but not on change.
   */
  accessibilityLabel?: string,
  /** The identifier used for testing */
  testID?: string,
}

export interface PickerItemProps {
  label: string,
  value?: ItemValue | undefined,
  color?: number | RN.ColorValue,
  backgroundColor?: RN.ColorValue,
}

export type ItemValue = number | string;
export type PickerComponent = (props: PickerProps) => JSX.Element;
