import RiveBase from 'rive-react-native';
import type {RiveProps} from './Rive.interface';

export function Rive(props: RiveProps) {
  return (
    <RiveBase
      url={props.url}
      ref={props.ref}
      fit={props.fit}
      style={props.style}
      autoplay={props.autoplay}
      alignment={props.alignment}
      artboardName={props.artboardName}
      animationName={props.animationName}
      stateMachineName={props.stateMachineName}
      testID={props.testID}
    />
  );
}
