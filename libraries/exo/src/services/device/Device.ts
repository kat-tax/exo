import type {IDevice} from './Device.interface';

export class DeviceService implements IDevice {
  BootSplash = {
    hide: async () => {},
    isVisible: async () => false,
    useHideAnimation: () => ({
      logo: {},
      brand: {},
      container: {},
    }),
  }

  getLocale(short?: boolean): string {
    const locale = navigator.language;
    return short
      ? locale.split('-').shift() || locale
      : locale;
  }

  share(url: string, title: string) {
    navigator.share({url, title}).catch(() => {});
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
}
