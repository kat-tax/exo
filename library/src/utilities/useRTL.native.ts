import {I18nManager} from 'react-native';

export function useRTL(): boolean {
  return I18nManager.isRTL;
}
