// import BootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import {Share} from 'react-native';

import type {DeviceBase} from './Device.interface';

export class DeviceService implements DeviceBase {
  // BootSplash = BootSplash;

  share(url: string, title: string) {
    Share.share({url, title, message: url}, {
      dialogTitle: title,
    });
  }

  async isOnline() {
    const netinfo = await NetInfo.fetch();
    return !!(netinfo.isConnected && netinfo.isInternetReachable);
  }

  suscribeOnline(update: (isOnline: boolean) => void) {
    return NetInfo.addEventListener(e => () =>
      update(!!(e.isConnected && e.isInternetReachable))
    );
  }
}

