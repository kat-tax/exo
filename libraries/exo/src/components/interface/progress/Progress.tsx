import {View} from 'react-native';
import {fillAbsolute} from 'utils/styles';
import * as P from '@radix-ui/react-progress';

import type {ProgressProps} from './Progress.interface';
import styles from './Progress.styles';

export function Progress(props: ProgressProps) {
  const $styles = {
    root: [
      styles.root,
      props.style,
      props.fullWidth && styles.fullWidth,
    ],
    active: [
      styles.active,
      {
        transform: `translateX(-${100 - (props.progress || 0)}%)`,
        backgroundColor: props.progressColor || '#000',
      },
    ],
  };
  return (
    <View style={$styles.root} testID={props.testID}>
      <P.Root style={fillAbsolute} value={props.progress}>
        <View style={$styles.active}>
          <P.Indicator style={fillAbsolute}/>
          {props.customElement}
        </View>
      </P.Root>
    </View>
  );
}
