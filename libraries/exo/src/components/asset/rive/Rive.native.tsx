import RiveBase from 'rive-react-native';
import type {RiveProps} from './Rive.interface';

export function Rive(props: RiveProps) {
  return (
    <RiveBase
      url="https://cdn.rive.app/animations/vehicles.riv"
      artboardName={props.artboardName}
      animationName={props.animationName}
      autoplay={props.autoplay}
    />
  );
}
