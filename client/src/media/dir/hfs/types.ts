import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {GestureResponderEvent} from 'react-native';

export interface Hfs {
  path: string,
  list: Array<HfsDirectoryEntry>,
}

export interface HfsCtx {
  hfs: Hfs,
  cmd: HfsCmd,
  ext: {
    sel: string[],
    dnd: string[],
  },
}

export interface HfsCmd {
  share: (entry: HfsDirectoryEntry) => Promise<void>,
  open: (entry: HfsDirectoryEntry) => Promise<void>,
  copy: (entry: HfsDirectoryEntry) => Promise<void>,
  rename: (entry: HfsDirectoryEntry) => Promise<void>,
  select: (entry: HfsDirectoryEntry, event?: GestureResponderEvent) => void,
  upload: (entry: HfsDirectoryEntry, files: File[]) => Promise<void>,
  compress: (entry: HfsDirectoryEntry) => Promise<void>,
  download: (entry: HfsDirectoryEntry) => Promise<void>,
  purge: (entry: HfsDirectoryEntry) => Promise<void>,
  move: (from: HfsDirectoryEntry, to?: HfsDirectoryEntry) => Promise<void>,
}
