import {Platform} from 'react-native';

globalThis.global = globalThis;
globalThis.__WEB__ = Platform.OS === 'web';
globalThis.__NATIVE__ = Platform.OS !== 'web';
globalThis.__ANDROID__ = Platform.OS === 'android';
globalThis.__WINDOWS__ = Platform.OS === 'windows';
globalThis.__MACOS__ = Platform.OS === 'macos';
globalThis.__IOS__ = Platform.OS === 'ios';
globalThis.__TV__ = Platform.isTV;
globalThis.__XR__ = Platform.isVision;
globalThis.__TOUCH__ = (() => {
  switch (Platform.OS) {
    case 'ios':
    case 'android':
      return true;
    case 'macos':
    case 'windows':
      return false;
    case 'web':
      return navigator.maxTouchPoints > 0
        || 'ontouchstart' in window;
    default:
      return false;
  }
})();

