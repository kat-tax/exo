import {sourceLocale} from 'config/locales';
import type {DeviceBase} from './Device.interface';

export class DeviceService implements DeviceBase {
  async share({url, title, files}: {url?: string, title?: string, files?: File[]}) {
    if (navigator.canShare({url, title, files})) {
      await navigator.share({url, title, files});
      return true;
    }
    return false;
  }

  async isOnline() {
    return navigator.onLine;
  }

  suscribeOnline(update: (isOnline: boolean) => void) {
    const handler = () => update(navigator.onLine);
    window.addEventListener('online', handler);
    window.addEventListener('offline', handler);
    return () => {
      window.removeEventListener('online', handler);
      window.removeEventListener('offline', handler);
    };
  }

  getLocale() {
    return navigator.language.split('-').shift() || sourceLocale;
  }
}
