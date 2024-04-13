import {StyleSheet, View} from 'react-native';
import {fillAbsolute} from '_lib/styles';
import * as P from '@radix-ui/react-progress';

import type {ProgressComponent, ProgressProps} from './Progress.interface';

export const Progress: ProgressComponent = (props: ProgressProps) => {
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

const styles = StyleSheet.create({
  root: {
    height: 8,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#d2d6d8',
    borderRadius: 99999,
    /* Fix overflow clipping in Safari */
    /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
    transform: 'translateZ(0)',
  },
  fullWidth: {
    width: '100%',
  },
  active: {
    width: '100%',
    height: '100%',
    borderRadius: 99999,
    // @ts-ignore Web property
    transition: 'transform 660ms linear',
  },
});

