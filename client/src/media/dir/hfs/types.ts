import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {GestureResponderEvent} from 'react-native';

export interface Hfs {
  path: string,
  list: Array<HfsDirectoryEntry>,
}

export interface HfsCtx {
  hfs: Hfs,
  cmd: HfsCmd,
  sel: string[],
}

export interface HfsCmd {
  move: (from: HfsDirectoryEntry, to: HfsDirectoryEntry) => Promise<void>,
  purge: (entry: HfsDirectoryEntry) => Promise<void>,
  select: (entry: HfsDirectoryEntry, event?: GestureResponderEvent) => void,
  upload: (entry: HfsDirectoryEntry, files: File[]) => Promise<void>,
  download: (entry: HfsDirectoryEntry) => Promise<void>,
}
