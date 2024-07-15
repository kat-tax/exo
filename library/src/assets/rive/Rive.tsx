import {View} from 'react-native';
import RiveBase from '@rive-app/react-canvas';
import type {RiveComponent, RiveProps} from './Rive.interface';

/** A component that renders Rive animations */
export const Rive: RiveComponent = (props: RiveProps) => {
  return (
    <View style={props.style} testID={props.testID}>
      <RiveBase
        src={props.url}
        ref={props.refWeb}
      />
    </View>
  );
}
