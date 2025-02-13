import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {GestureResponderEvent} from 'react-native';
import type {ListBarProps} from 'media/stacks/list/bar';

export interface Hfs {
  path: string,
  list: Array<HfsDirectoryEntry>,
}

export interface HfsCtx {
  hfs: Hfs,
  cmd: HfsCmd,
  bar?: ListBarProps,
  ext: {
    tmp?: boolean,
    sel: string[],
    dnd: string[],
  },
}

export interface HfsOpt {
  selected: {
    self: boolean,
    prev: boolean,
    next: boolean,
    count: number,
  },
}

export interface HfsCmd {
  goUp: () => boolean,
  share: (entry: HfsDirectoryEntry) => Promise<void>,
  open: (entry: HfsDirectoryEntry, clearSel?: boolean) => Promise<void>,
  copy: (entry: HfsDirectoryEntry) => Promise<void>,
  move: (from: HfsDirectoryEntry, to?: HfsDirectoryEntry) => Promise<void>,
  purge: (entry: HfsDirectoryEntry) => Promise<void>,
  rename: (entry: HfsDirectoryEntry) => Promise<void>,
  select: (entry: HfsDirectoryEntry, event?: GestureResponderEvent) => void,
  upload: (entry: HfsDirectoryEntry, files: File[]) => Promise<void>,
  download: (entry: HfsDirectoryEntry) => Promise<void>,
  compress: (entry: HfsDirectoryEntry) => Promise<void>,
  thumbnail: (entry: HfsDirectoryEntry) => Promise<string | null>,
}
