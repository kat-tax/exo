import type {TorrentInfo, TorrentFileData} from 'torrent/types';
import type {GestureResponderEvent} from 'react-native';
import type {HfsFileEntry} from 'media/dir/types/hfs';

export interface Torrent {
  file: File,
  info: TorrentInfo,
  data: TorrentFileData,
  list: TorrentFileData['files'],
  name: string,
  desc?: string,
}

export type TorrentCtx = {
  torrent: Torrent | null,
  cmd: TorrentCmd,
}

export type TorrentOpt = {
  layout?: 'list' | 'grid',
  preview?: boolean,
  focused?: boolean,
  dragging?: boolean,
};

export type TorrentCmd = {
  download: (
    file: TorrentFileEntry,
    event?: GestureResponderEvent,
    target?: HfsFileEntry,
  ) => Promise<void>,
}

export type TorrentFileEntry = TorrentFileData['files'][number];
