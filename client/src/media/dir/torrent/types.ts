export type TorrentFileEntry = TorrentFileData['files'][number];

export interface TorrentInfo {
  /** Filename */
  name: string;
  /** The announce URL of the trackers */
  announce: string[];
  /** Free-form textual comments of the author */
  comment?: string;
  /** If false the client may obtain peer from other means, e.g. PEX peer exchange, dht. Here, "private" may be read as "no external peer source". */ 
  private?: boolean;
  /** Date the torrent was created */
  created?: Date;
  /** Name and version of the program used to create the .torrent (string) */
  createdBy?: string;
  /** Web URLs to download torrent files */
  urlList: string[];
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
