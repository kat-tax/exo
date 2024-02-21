import {Skottie as LottieBase} from 'react-native-skottie';
import type {LottieProps} from './Lottie.interface';

export function Lottie(props: LottieProps) {
  return (
    <LottieBase {...props}/>
  );
}
