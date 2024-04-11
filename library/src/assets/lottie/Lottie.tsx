import {View} from 'react-native';
import {DotLottiePlayer as LottieBase} from '@dotlottie/react-player';
import type {LottieComponent, LottieProps} from './Lottie.interface';

/** A component that renders Lottie animations */
export const Lottie: LottieComponent = (props: LottieProps) => {
  return (
    <View 
      style={{
        ...props.style,
        width: props.width,
        height: props.height,
      }}>
      <LottieBase
        src={props.url}
        speed={props.speed}
        loop={props.loop}
        autoplay={props.autoplay}
        style={{
          width: props.width,
          height: props.height,
        }}
      />
    </View>
  );
}
