import {StyleSheet} from 'react-native';
import SliderBase from '@react-native-community/slider';

import type {SliderProps} from './SliderProps';

export function Slider(props: SliderProps) {
  return (
    <SliderBase
      style={[styles.root, props.style]}
      testID={props.testID}
      disabled={props.disabled}
      value={props.value}
      step={props.step || 1}
      minimumValue={props.minimumValue || 0}
      maximumValue={props.maximumValue || 100}
      lowerLimit={props.lowerLimit || 0}
      upperLimit={props.upperLimit || 100}
      maximumTrackTintColor={props.trackColor}
      minimumTrackTintColor={props.rangeColor || '#000'}
      thumbTintColor={props.thumbColor || '#000'}
      onValueChange={props.onChange}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 40,
  },
});
