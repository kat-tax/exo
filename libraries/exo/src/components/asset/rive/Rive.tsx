import {View} from 'react-native';
import RiveBase from '@rive-app/react-canvas';
import type {RiveProps} from './Rive.interface';

export function Rive(props: RiveProps) {
  return (
    <View style={props.style}>
      <RiveBase
        src="https://cdn.rive.app/animations/vehicles.riv"
        artboard={props.artboardName}
        animations={props.animationName}
      />
    </View>
  );
}
