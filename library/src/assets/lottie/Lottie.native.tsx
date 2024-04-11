import {Skottie as LottieBase} from 'react-native-skottie';
import type {LottieComponent, LottieProps} from './Lottie.interface';

export const Lottie: LottieComponent = (props: LottieProps) => {
  return (
    <LottieBase
      source={props.url}
      autoPlay={props.autoplay}
      style={{
        ...props.style,
        width: props.width,
        height: props.height,
      }}
      {...props}
    />
  );
}
