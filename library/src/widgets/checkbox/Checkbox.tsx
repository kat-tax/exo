import {StyleSheet, View} from 'react-native';
import {colorWithOpacity} from '_lib/colors';
import {fillDisplayRow} from '_lib/styles';

import * as C from '@radix-ui/react-checkbox';

import type {CheckboxComponent, CheckboxProps} from './Checkbox.interface';
import './Checkbox.css';

/**
 * A component that allows a boolean selection
 */
export const Checkbox: CheckboxComponent = (props: CheckboxProps) => {
  const colorBox = props.boxColor || '#000';
  const colorIndicator = props.indicatorColor || '#fff';
  return (
    <View style={[styles.root, props.style]} testID={props.testID}>
      <C.Root
        id={props.id}
        ref={props.refWeb}
        name={props.name}
        required={props.required}
        disabled={props.disabled}
        defaultChecked={props.value}
        onCheckedChange={props.onValueChange}
        className="exo-checkbox-root"
        style={{
          borderRadius: 2,
          cursor: 'pointer',
          userSelect: 'none',
          touchAction: 'none',
          justifyContent: 'center',
          backgroundColor: colorWithOpacity(colorBox, 0.4),
          ...fillDisplayRow,
        }}>
        <CheckboxIndicator color={colorIndicator}/>
      </C.Root>
    </View>
  );
}

function CheckboxIndicator(props: {color?: string}) {
  return (
    <C.Indicator>
      <View style={[styles.indicator, {backgroundColor: props.color}]}/>
    </C.Indicator>
  )
}

const styles = StyleSheet.create({
  root: {
    width: 16,
    height: 16,
  },
  indicator: {
    width: 8,
    height: 8,
  },
});
