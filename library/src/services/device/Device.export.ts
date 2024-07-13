import {DeviceService} from './Device';

export type * from './Device.interface';
export const Device = new DeviceService();
export const share = Device.share;
export const isOnline = Device.isOnline;
export const suscribeOnline = Device.suscribeOnline;
export const getLocale = Device.getLocale;
