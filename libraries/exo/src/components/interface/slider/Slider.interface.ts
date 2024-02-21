import type {StyleProp, ViewStyle} from 'react-native';

export interface SliderProps {
  /**
   * Write-only property representing the value of the slider.
   * Can be used to programmatically control the position of the thumb.
   * Entered once at the beginning still acts as an initial value.
   * The value should be between minimumValue and maximumValue,
   * which default to 0 and 1 respectively.
   * Default value is 0.
   *
   * This is not a controlled component, you don't need to update the
   * value during dragging.
   */
  value?: number;
  /**
   * Initial minimum value of the slider. Default value is 0.
   */
  minimumValue?: number;
  /**
   * Initial maximum value of the slider. Default value is 1.
   */
  maximumValue?: number;
  /**
   * The lower limit value of the slider. The user won't be able to slide below this limit.
   */
  lowerLimit?: number;
  /**
   * The upper limit value of the slider. The user won't be able to slide above this limit.
   */
  upperLimit?: number;
  /**
   * Step value of the slider. The value should be between 0 and (maximumValue - minimumValue). Default value is 0.
   */
  step?: number;
  /**
   * Called when the slider value changes
   */
  onChange?: (value: number) => void,
  /**
   * If true the user won't be able to move the slider.
   * Default value is false.
   */
  disabled?: boolean;
  /**
   * The color used for the track from minimum value to current value
   */
  rangeColor?: string,
  /**
   * The background track color
   */
  trackColor?: string,
  /**
   * The thumb accent color
   */
  thumbColor?: string,
  /**
   * Used to style and layout the Slider. See StyleSheet.js and ViewStylePropTypes.js for more info.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Form input name
   * (web only)
   */
  name?: string;
  /**
   * The slider's test identifier
   */
  testID?: string;
}
