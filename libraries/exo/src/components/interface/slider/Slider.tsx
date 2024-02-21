import {View} from 'react-native';
import {fillDisplayRow} from 'utils/styles';
import {colorWithOpacity} from 'utils/colors';
import * as S from '@radix-ui/react-slider';

import type {SliderProps} from './Slider.interface';
import './Slider.module.css';

export function Slider(props: SliderProps) {
  const value = [props.value || 0];

  return (
    <View
      style={[
        props.style,
        {
          height: 40,
          display: 'flex',
          justifyContent: 'center',
          marginHorizontal: 12,
        },
      ]}
      testID={props.testID}>
      <S.Root
        style={{
          ...fillDisplayRow,
          height: 20,
          cursor: 'pointer',
          userSelect: 'none',
          touchAction: 'none',
        }}
        disabled={props.disabled}
        name={props.name}
        defaultValue={value}
        step={props.step || 1}
        min={props.minimumValue || 0}
        max={props.maximumValue || 100}
        onValueChange={e => props.onChange && props.onChange(e[0] || 0)}>
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
    <S.Thumb className="slider-thumb" style={{
      width: 12,
      height: 12,
      display: 'block',
      borderRadius: 9999,
      backgroundColor: props.color || '#000',
      transition: ' 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)',
    }}/>
  );
}
