import {Platform} from 'react-native';

/**
 * Whether the current platform primarily uses touch input
 */
export function isTouch() {
  switch (Platform.OS) {
    case 'ios':
    case 'android':
      return true;
    case 'macos':
    case 'windows':
      return false;
    case 'web':
      return navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    default:
      return false;
  }
}
