import {FSService} from './Fs';

export type * from './Fs.interface';
export * as web from './lib/path/web';

export const fs = new FSService();
export const getDiskSpace = fs.getDiskSpace;

export const openFile = fs.openFile;
export const importFile = fs.importFile;

export const hashFile = fs.hashFile;
export const cancelHash = fs.cancelHash;

export const isTextFile = fs.isTextFile;
export const isBinaryFile = fs.isBinaryFile;
