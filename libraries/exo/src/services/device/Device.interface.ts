import type {ImageProps, ImageRequireSource, ViewProps} from 'react-native';

export interface IDevice {
  share(url: string, title: string): void,
  getLocale(short?: boolean): string,
  isOnline(): Promise<boolean>,
  suscribeOnline(update: (isOnline: boolean) => void): () => void,
  bootSplash: {
    hide: (config?: {fade?: boolean} | undefined) => Promise<void>,
    isVisible: () => Promise<boolean>,
    useHideAnimation: (config: {
      manifest: {
        background: string,
        darkBackground?: string,
        logo: {
          width: number,
          height: number,
        },
        brand?: {
          bottom: number,
          width: number,
          height: number,
        },
      };
      animate: () => void,
      logo?: ImageRequireSource,
      brand?: ImageRequireSource,
      darkLogo?: ImageRequireSource,
      darkBrand?: ImageRequireSource,
      statusBarTranslucent?: boolean,
      navigationBarTranslucent?: boolean,
    }) => {
      logo: ImageProps,
      brand: ImageProps,
      container: ViewProps,
    },
  }
}
