// @ts-ignore RNW only import
import {useLocaleContext} from 'react-native';

export function useRTL(): boolean {
  const {direction} = useLocaleContext();
  return direction === 'rtl';
}
