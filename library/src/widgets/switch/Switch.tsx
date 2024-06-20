import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
//import {colorWithOpacity} from '_lib/colors';

import * as S from '@radix-ui/react-switch';

import type {ColorValue} from 'react-native';
import type {SwitchComponent, SwitchProps} from './Switch.interface';
import './Switch.css';

export const Switch: SwitchComponent = (props: SwitchProps) => {
  const colorOff = props.offColor?.toString();
  const colorOn = props.onColor?.toString();
  const [value, setValue] = useState(props.value);
  return (
    <View style={[props.style, styles.root]} testID={props.testID}>
      <S.Root
        id={props.id}
        name={props.name}
        required={props.required}
        disabled={props.disabled}
        className="exo-switch-root"
        style={{backgroundColor: value ? colorOn : colorOff}}
        defaultChecked={value}
        onCheckedChange={e => {
          setValue(e);
          if (props.onValueChange) {
            props.onValueChange(e);
          }
        }}> 
        <SwitchThumb color={props.thumbColor}/>
      </S.Root>
    </View>
  );
}

function SwitchThumb(props: {color?: ColorValue}) {
  return (
    <S.Thumb
      className="exo-switch-thumb"
      style={{backgroundColor: props.color?.toString() || '#fff'}}
    />
  )
}

const styles = StyleSheet.create({
  root: {
    // ...
  },
  thumb: {
    // ...
  },
});
