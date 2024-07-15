import {StyleSheet, View} from 'react-native';
import {colorWithOpacity} from '_lib/colors';
import {fillDisplayRow} from '_lib/styles';

import * as S from '@radix-ui/react-slider';

import type {SliderComponent, SliderProps} from './Slider.interface';
import './Slider.css';

/**
 * A component that allows ranged value selection
 */
export const Slider: SliderComponent = (props: SliderProps) => {
  return (
    <View style={[styles.root, props.style]} testID={props.testID}>
      <S.Root
        name={props.name}
        disabled={props.disabled}
        step={props.step ?? 1}
        min={props.lowerLimit ?? 0}
        max={props.upperLimit ?? 1}
        defaultValue={[props.value ?? 0]}
        onValueChange={e => props?.onChange?.(e[0] ?? 0)}
        style={{
          height: 20,
          cursor: 'pointer',
          userSelect: 'none',
          touchAction: 'none',
          ...fillDisplayRow,
        }}>
        <SliderTrack color={props.trackColor}>
          <SliderRange color={props.rangeColor}/>
        </SliderTrack>
        <SliderThumb color={props.thumbColor}/>
      </S.Root>
    </View>
  );
}

function SliderTrack(props: {color?: string, children: React.ReactNode}) {
  return (
    <S.Track style={{
      height: 2,
      flexGrow: 1,
      position: 'relative',
      backgroundColor: colorWithOpacity(props.color || '#d2d6d8', 0.4)
    }}>
      {props.children}
    </S.Track>
  );
}

function SliderRange(props: {color?: string}) {
  return (
    <S.Range style={{
      height: '100%',
      position: 'absolute',
      borderRadius: 9999,
      backgroundColor: props.color || '#000',
    }}/>
  );
}

function SliderThumb(props: {color?: string}) {
  return (
    <S.Thumb className="exo-slider-thumb" style={{
      width: 12,
      height: 12,
      display: 'block',
      borderRadius: 9999,
      backgroundColor: props.color || '#000',
      transition: '0.2s cubic-bezier(0.215, 0.61, 0.355, 1)',
    }}/>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 12,
    minWidth: 100,
    height: 40,
  },
});
