import {View} from 'react-native';
import * as S from '@radix-ui/react-switch';

import type {SwitchComponent, SwitchProps} from './Switch.interface';
import './Switch.css';

export const Switch: SwitchComponent = (props: SwitchProps) => {
  return (
    <View style={props.style} testID={props.testID}>
      <S.Root
        id={props.id}
        name={undefined}
        required={undefined}
        disabled={props.disabled}
        defaultChecked={props.value}
        onCheckedChange={props.onValueChange}
        className="switch-root">
        <S.Thumb className="switch-thumb"/>
      </S.Root>
    </View>
  );
}
