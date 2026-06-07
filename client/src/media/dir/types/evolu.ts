import type {GestureResponderEvent} from 'react-native';
import type {PathId, DeviceId} from 'app/data/types';
import type {getPathById} from 'app/data/queries';
import type {BarProps} from 'media/stacks/bar';

export interface DirEvolu {
  path: ReturnType<typeof getPathById>['Row'],
  list: Array<DirEvoluEntry>,
  deviceId: DeviceId,
}

export type DirEvoluCtx = {
  dir: DirEvolu,
  cmd: DirEvoluCmd,
  bar?: BarProps,
  ext: {
    tmp?: boolean,
    sel: string[],
  },
}

export type DirEvoluOpt = {
  layout?: 'list' | 'grid',
  preview?: boolean,
  focused?: boolean,
  selected?: {
    all: string[],
    self: boolean,
    prev: boolean,
    next: boolean,
    count: number,
  },
}

export type DirEvoluCmd = {
  goUp: () => boolean,
  open: (entry: DirEvoluEntry, clearSel?: boolean) => Promise<void>,
  select: (entry: DirEvoluEntry, event?: GestureResponderEvent) => void,
  download: (entry: DirEvoluEntry) => Promise<void>,
}

export type DirEvoluEntry = {
  /** Id of the file in the database */
  id: PathId;
  /** The name of the file or directory */
  name: string;
  /** The size of the entry in bytes */
  size: number;
  /** The thumbnail of the entry */
  thumb: Uint8Array | null;
  /** The last modified date of the entry */
  updatedAt: Date;
  /** The created date of the entry */
  createdAt: Date;
  /** True if the entry is a directory, false if not */
  isDirectory: boolean;
  /** True if the entry is a file, false if not */
  isFile: boolean;
}
