export interface IDevice {
  getLocale(short?: boolean): string,
  share(url: string, title: string): void,
  isOnline(): Promise<boolean>,
  suscribeOnline(update: (isOnline: boolean) => void): () => void,
}
