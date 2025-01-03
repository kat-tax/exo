import {FSService} from './Fs';

export type * from './Fs.interface';
export * as web from './lib/path/web';

export const FS = new FSService();
export const getDiskSpace = FS.getDiskSpace;

export const openFile = FS.openFile;
export const importFile = FS.importFile;

export const hashFile = FS.hashFile;
export const cancelHash = FS.cancelHash;

export const isTextFile = FS.isTextFile;
