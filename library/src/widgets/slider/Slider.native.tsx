import {StyleSheet} from 'react-native';
import SliderBase from '@react-native-community/slider';

import type {SliderComponent, SliderProps} from './Slider.interface';

export const Slider: SliderComponent = (props: SliderProps) => {
  return (
    <SliderBase
      style={[styles.root, props.style]}
      testID={props.testID}
      disabled={props.disabled}
      step={(props.step ?? 100) / 100}
      value={(props.value ?? 0) / 100}
      onValueChange={e => props?.onChange?.((e ?? 0) / 100)}
      lowerLimit={(props.lowerLimit ?? 0) / 100}
      upperLimit={(props.upperLimit ?? 100) / 100}
      maximumTrackTintColor={props.trackColor}
      minimumTrackTintColor={props.rangeColor || '#000'}
      thumbTintColor={props.thumbColor || '#000'}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 40,
  },
});
