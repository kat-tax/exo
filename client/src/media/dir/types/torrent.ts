import type {GestureResponderEvent} from 'react-native';
import type {HfsDirectoryEntry} from 'react-exo/fs';

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

export type TorrentCmd = {
  download: (
    file: TorrentFileEntry,
    event?: GestureResponderEvent,
    target?: HfsDirectoryEntry,
  ) => Promise<void>,
}

export interface TorrentInfo {
  name: string,
  urlList: string[],
  announce: string[],
  comment?: string,
  private?: boolean,
  created?: Date,
  createdBy?: string,
}

export interface TorrentFileData {
  /** Length of the file in bytes */
  length: number;
  /** Array of files */
  files: Array<{
    /** Path to the file */
    path: string;
    /** Filename */
    name: string;
    /** Length of the file in bytes */
    length: number;
    /** Offset of the file in bytes */
    offset: number;
  }>;
  /** Number of bytes in each piece */
  pieceLength: number;
  /** Length of the last piece in bytes */
  lastPieceLength: number;
  /** Array of piece hashes */
  pieces: string[];
}

export type TorrentFileEntry = TorrentFileData['files'][number];
