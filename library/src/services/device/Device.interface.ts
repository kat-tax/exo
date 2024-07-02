export interface DeviceBase {
  share(url: string, title: string): void,
  isOnline(): Promise<boolean>,
  suscribeOnline(update: (isOnline: boolean) => void): () => void,
  getLocale(): string,
}
