import {View} from 'react-native';
import RiveBase from '@rive-app/react-canvas';
import type {RiveProps} from './Rive.interface';

export function Rive(props: RiveProps) {
  return (
    <View style={props.style} testID={props.testID}>
      <RiveBase
        src={props.url}
        ref={props.ref}
      />
    </View>
  );
}
