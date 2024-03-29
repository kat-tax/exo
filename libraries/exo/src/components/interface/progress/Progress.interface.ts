import type {StyleProp, ViewStyle} from 'react-native';

export type ProgressComponent = (props: ProgressProps) => JSX.Element;

export interface ProgressProps {
  /**
   * The progress of the bar from 0 to 100
   */
  progress?: number;
  /**
   * Progress color
   */
  progressColor?: string;
  /**
   * Custom element to render on top of the animated progress
   */
  customElement?: JSX.Element;
  /**
   * Display the progress bar at full width in it's container
   */
  fullWidth?: boolean;
  /**
   * Override container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * The slider's test identifier
   */
  testID?: string;
}
