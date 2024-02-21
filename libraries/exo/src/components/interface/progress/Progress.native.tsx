import ProgressBar from 'react-native-ui-lib/progressBar';
import type {ProgressProps} from './Progress.interface';

export function Progress(props: ProgressProps) {
  return (
    <ProgressBar
      testID={props.testID}
      progress={props.progress}
      progressColor={props.progressColor || '#000'}
      customElement={props.customElement}
      fullWidth={props.fullWidth}
      style={props.style}
    />
  );
}
