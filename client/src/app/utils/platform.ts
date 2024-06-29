import {Platform} from 'react-native';

export function isTV() {
  return Platform.isTV;
}

export function isWeb() {
  return Platform.OS === 'web';
}

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isWindows() {
  return Platform.OS === 'windows';
}

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isMacOS() {
  return Platform.OS === 'macos';
}

export function isNative() {
  return Platform.OS !== 'web';
}

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

export function isBrave() {
  if (Platform.OS !== 'web') return false;
  if ('brave' in navigator) {
    // @ts-ignore
    return navigator.brave.isBrave().then(e => e);
  } else {
    return false;
  }
}

export function getPlatforms() {
  return [
    'Web',
    'Android',
    'iOS',
    'VisionOS',
    'MacOS',
    'Windows',
  ];
}

export function getClient() {
  if (Platform.OS === 'web')
    return navigator.userAgent.slice(0, 255);
  return Platform.OS;
}
