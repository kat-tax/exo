export type TorrentInfo = {
  /** Name of the torrent */
  name: string,
  /** List of URLs for the torrent */
  urlList: string[],
  /** List of announce URLs for the torrent */
  announce: string[],
  /** Comment for the torrent */
  comment?: string,
  /** Whether the torrent is private */
  private?: boolean,
  /** Date the torrent was created */
  created?: Date,
  /** Name of the creator of the torrent */
  createdBy?: string,
}

export type TorrentFileData = {
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
