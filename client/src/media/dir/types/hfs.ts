import type {GestureResponderEvent} from 'react-native';
import type {HfsDirectoryEntry} from 'react-exo/fs';
import type {ListBarProps} from 'media/stacks/list/bar';

export interface Hfs {
  path: string,
  list: Array<HfsDirectoryEntry>,
}

export type HfsCtx = {
  dir: Hfs,
  cmd: HfsCmd,
  bar?: ListBarProps,
  ext: {
    tmp?: boolean,
    sel: string[],
    dnd: string[],
    rnm: string[],
  },
  opt?: {
    dropping?: boolean,
  },
  refs?: Array<any>,
}

export type HfsOpt = {
  layout?: 'list' | 'grid',
  preview?: boolean,
  focused?: boolean,
  dragging?: boolean,
  dropping?: boolean,
  renaming?: boolean,
  selected?: {
    self: boolean,
    prev: boolean,
    next: boolean,
    count: number,
  },
}

export type HfsCmd = {
  goUp: () => boolean,
  refresh: () => Promise<boolean>,
  share: (entry: HfsFileEntry) => Promise<void>,
  open: (entry: HfsFileEntry, clearSel?: boolean) => Promise<void>,
  copy: (entry: HfsFileEntry) => Promise<void>,
  move: (from: HfsFileEntry, to?: HfsFileEntry) => Promise<void>,
  purge: (entry: HfsFileEntry) => Promise<void>,
  rename: (entry: HfsFileEntry, name?: string | null) => Promise<void>,
  select: (entry: HfsFileEntry, event?: GestureResponderEvent) => void,
  upload: (entry: HfsFileEntry, files: File[]) => Promise<void>,
  download: (entry: HfsFileEntry) => Promise<void>,
  compress: (entry: HfsFileEntry) => Promise<void>,
  thumbnail: (entry: HfsFileEntry) => Promise<string | null>,
}

export type HfsFileEntry = HfsDirectoryEntry & {}
