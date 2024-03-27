import type BootSplash from 'react-native-bootsplash';

export interface IDevice {
  BootSplash: typeof BootSplash,
  getLocale(short?: boolean): string,
  share(url: string, title: string): void,
  isOnline(): Promise<boolean>,
  suscribeOnline(update: (isOnline: boolean) => void): () => void,
}
