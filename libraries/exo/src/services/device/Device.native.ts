import {Share, Platform, NativeModules} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';

import type {IDevice} from './Device.interface';

export class DeviceImpl implements IDevice {
  getLocale(short?: boolean) {
    const locale: string = Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale
        || NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;
    return short
      ? Platform.OS === 'ios'
        ? locale.split('-').shift() || locale
        : locale.split('_').shift() || locale
      : locale;
  }

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

  bootSplash = BootSplash;
}

