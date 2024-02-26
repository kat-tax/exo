import {View} from 'react-native';
import {DotLottiePlayer as LottieBase} from '@dotlottie/react-player';
import type {LottieProps} from './Lottie.interface';

export function Lottie(props: LottieProps) {
  return (
    <View style={props.style}>
      <LottieBase
        src={props.url}
        speed={props.speed}
        loop={props.loop}
        autoplay={props.autoplay}
      />
    </View>
  );
}
