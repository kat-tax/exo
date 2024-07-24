import * as Tauri from '@tauri-apps/api/core';
import {Platform} from 'react-native';

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

export function isTV() {
  return Platform.isTV;
}

export function isTauri() {
  return Tauri.isTauri;
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

export async function isBrave() {
  if (!isWeb())
    return false;
  if ('brave' in navigator) {
    return await (navigator.brave as {
      isBrave: () => Promise<boolean>,
    }).isBrave();
  }
  return false;
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
  return isWeb()
    ? navigator.userAgent.slice(0, 255)
    : Platform.OS;
}
