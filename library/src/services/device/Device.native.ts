import NetInfo from '@react-native-community/netinfo';
import {Share, Platform, NativeModules} from 'react-native';
import {sourceLocale} from 'config/locales';

import type {DeviceBase} from './Device.interface';

export class DeviceService implements DeviceBase {
  async share({url, title}: {url?: string, title?: string}) {
    if (!url) return false;
    const result = await Share.share({url, title, message: url}, {
      dialogTitle: title,
    });
    return result.action === Share.sharedAction;
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

  getLocale(): string {
    switch (Platform.OS) {
      case 'ios':
        return ((NativeModules.SettingsManager.settings.AppleLocale
          || NativeModules.SettingsManager.settings.AppleLanguages[0])
          ?.split('-')?.shift()) || sourceLocale;
      case 'android':
        return (NativeModules.I18nManager.localeIdentifier
          ?.split('_')?.shift()) || sourceLocale;
      default:
        return sourceLocale;
    }
  }
}
