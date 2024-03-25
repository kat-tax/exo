import {StyleSheet, View} from 'react-native';
import * as S from '@radix-ui/react-switch';

import type {SwitchComponent, SwitchProps} from './Switch.interface';
import './Switch.css';

export const Switch: SwitchComponent = (props: SwitchProps) => {
  const vstyles = {
    container: [
      styles.container,
      props.style,
    ],
  };

  return (
    <View style={vstyles.container} testID={props.testID}>
      <label className="switch-label" htmlFor={props.id}>
        {props.label}
      </label>
      <S.Root
        className="switch-root"
        id={props.id}
        name={undefined}
        required={undefined}
        disabled={props.disabled}
        checked={props.value}
        onCheckedChange={props.onValueChange}>
        <S.Thumb className="switch-thumb"/>
      </S.Root>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  fullWidth: {
    width: '100%',
  },
});
