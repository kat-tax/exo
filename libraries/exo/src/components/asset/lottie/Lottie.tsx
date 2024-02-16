import {View} from 'react-native';
import {DotLottiePlayer as LottieBase} from '@dotlottie/react-player';
import type {LottieProps} from './Lottie.props';

export function Lottie(props: LottieProps) {
  return (
    <View style={props.style}>
      <LottieBase
        src={props.source}
        autoplay={props.autoPlay}
        loop={props.loop}
        speed={props.speed}
      />
    </View>
  );
}
