import type * as RN from 'react-native';

export interface PickerProps<T = ItemValue> extends RN.ViewProps {
  style?: RN.StyleProp<RN.TextStyle>;
  /**
   * Value matching value of one of the items. Can be a string or an integer.
   */
  selectedValue?: T;
  /**
   * Callback for when an item is selected. This is called with the following parameters:
   *   - `itemValue`: the `value` prop of the item that was selected
   *   - `itemIndex`: the index of the selected item in this picker
   */
  onValueChange?: (itemValue: T, itemIndex: number) => void;
  /**
   * If set to false, the picker will be disabled, i.e. the user will not be able to make a
   * selection.
   * @platform android
   */
  enabled?: boolean;
  /**
   * On Android, specifies how to display the selection items when the user taps on the picker:
   *
   *   - 'dialog': Show a modal dialog. This is the default.
   *   - 'dropdown': Shows a dropdown anchored to the picker view
   *
   * @platform android
   */
  mode?: 'dialog' | 'dropdown';
  /**
   * Style to apply to each of the item labels.
   * @platform ios
   */
  itemStyle?: RN.StyleProp<RN.TextStyle>;
  /**
  * Color to apply to the selection indicator.
  * @platform ios
  */
  selectionColor?: RN.ColorValue;
  /**
   * Prompt string for this picker, used on Android in dialog mode as the title of the dialog.
   * @platform android
   */
  prompt?: string;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
  /**
   * Color of arrow for spinner dropdown in hexadecimal format
   * @platform android
   */
  dropdownIconColor?: number | RN.ColorValue;
  /**
   * Ripple color of spinner's arrow
   * @platform android
   */
  dropdownIconRippleColor?: number | RN.ColorValue;
  /**
   * On Android & iOS, used to truncate the text with an ellipsis after computing the text layout, including line wrapping,
   * such that the total number of lines does not exceed this number. Default is '1'
   * @platform android & iOS
   */
  numberOfLines?: number;
  /**
   * The string used for the accessibility label. Will be read once focused on the picker but not on change.
   */
  accessibilityLabel?: string;
  /**
   * Placeholder string for this picker, used on Windows if no item has been selected.
   * @platform windows
   */
  placeholder?: string;  
  /**
   * Called when picker is focused
   * @platform android
   */
  onFocus?: (e: RN.NativeSyntheticEvent<RN.TargetedEvent>) => void;
  /**
   * Called when picker is blurred
   * @platform android
   */
  onBlur?: (e: RN.NativeSyntheticEvent<RN.TargetedEvent>) => void;
}

export interface PickerItemProps {
  label: string;
  value?: ItemValue | undefined;
  color?: number | RN.ColorValue;
  backgroundColor?: RN.ColorValue;
}

export type ItemValue = number | string;
export type PickerComponent = (props: PickerProps) => JSX.Element;
