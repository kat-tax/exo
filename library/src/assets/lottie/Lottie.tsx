import {View} from 'react-native';
import {DotLottieReact} from '@lottiefiles/dotlottie-react';
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
      {typeof window !== 'undefined' &&
        <DotLottieReact
          src={props.url}
          speed={props.speed}
          loop={props.loop}
          autoplay={props.autoplay}
          autoResizeCanvas={false}
          style={{
            width: props.width,
            height: props.height,
          }}
        />
      }
    </View>
  );
}
