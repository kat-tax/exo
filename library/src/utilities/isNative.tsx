import {Platform} from 'react-native';

/**
 * Whether the current platform is a native platform (not web)
 */
export function isNative(): boolean {
  return Platform.OS !== 'web';
}
