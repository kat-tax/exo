import {FSService} from './Fs';

export type * from './Fs.interface';
export const fs = new FSService();
export const getDiskSpace = fs.getDiskSpace;
export const hashFile = fs.hashFile;
export const cancelHash = fs.cancelHash;
