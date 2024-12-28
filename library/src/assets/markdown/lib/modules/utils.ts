import {Linking} from 'react-native';

let uuid = new Date().getTime();

export function getUniqueID() {
  uuid++;
  return `rnmd_${uuid.toString(16)}`;
}

export function openUrl(
  url: string,
  onLinkPress?: (url: string) => boolean,
): void {
  if (onLinkPress) {
    const result = onLinkPress(url);
    if (url && result && typeof result === 'boolean') {
      Linking.openURL(url);
    }
  } else if (url) {
    Linking.openURL(url);
  }
}
