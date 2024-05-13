import {DeviceService} from './Device';

export type * from './Device.interface';
export const Device = new DeviceService();
// export const BootSplash = Device.BootSplash;
export const share = Device.share;
export const isOnline = Device.isOnline;
export const suscribeOnline = Device.suscribeOnline;
