//import type BootSplash from 'react-native-bootsplash';

export interface DeviceBase {
  //BootSplash: typeof BootSplash,
  share(url: string, title: string): void,
  isOnline(): Promise<boolean>,
  suscribeOnline(update: (isOnline: boolean) => void): () => void,
}
